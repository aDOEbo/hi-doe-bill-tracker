import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import SavedBill from '../components/SavedBill';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ROLE } from '../../api/role/Role';
import Autocomplete from '../components/Autocomplete';
import { Hearings } from '../../api/hearing/HearingCollection';
import { Saved } from '../../api/save/SavedBillCollection';
import Filter from '../components/Filter';

const SavedBills = () => {
  const { ready, savedBill, hearings } = useTracker(() => {
    const subscription = Saved.subscribeToSavedBill();
    const hearingBillsSubscription = Hearings.subscribeHearings();
    const rdy = subscription.ready() && hearingBillsSubscription.ready();
    const owner = Meteor.user().username;
    const savedBillItem = Saved.find({ owner }, {}).fetch();
    const hearingItems = Hearings.find({}).fetch();
    return {
      savedBill: savedBillItem,
      hearings: hearingItems,
      ready: rdy,
    };
  }, []);
  const [data, setData] = useState([]);

  const table_headers = Roles.userIsInRole(Meteor.userId(), [ROLE.SECRETARY]) ?
    ['', 'Bill Number', 'Bill Name', 'Bill Status', 'Hearing Date', 'View Bill', 'Assign', 'Remove'] :
    ['', 'Bill Number', 'Bill Name', 'Bill Status', 'Hearing Date', 'View Bill', 'Remove'];

  const BillData = savedBill.map((save) => ({
    _id: save._id,
    bill_name: save.bill_name,
    bill_status: save.bill_status,
    bill_hearing: save.bill_hearing,
    bill_number: save.bill_number,
  }));
  const HearingData2 = hearings.map((hearingData) => ({
    hearingLocation: hearingData.room,
    dateIntroduced: hearingData.year,
    committeeHearing: hearingData.notice,
    measureNum: hearingData.measureNumber,
    roomNumber: hearingData.room,
    doeStance: hearingData.description,
    dateTime: hearingData.datetime,
  }));
  useEffect(() => {
    setData(BillData);
  }, [ready, savedBill]);
  const [currentTab, setCurrentTab] = useState('Upcoming Bills');
  const handleCurrentTab = (tabName) => {
    setCurrentTab(tabName);
  };
  return (ready ? (
    <Container id={PAGE_IDS.SAVED_BILLS} className="py-3">
      <Row className="justify-content-center">
        <Col md={3}>
          <Filter tab={currentTab} data={data} handleDataFiltering={setData} />
        </Col>
        <Col md={7}>
          <Autocomplete billData={data} onDataFiltering={setData} />
          <Tabs
            defaultActiveKey="upcoming-hearings"
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={(e) => (handleCurrentTab(e))}
          >
            <Tab eventKey="upcoming-hearings" title="Upcoming Hearings">
              <Col className="text-center">
                <h2>Upcoming Bills</h2>
              </Col>
              <SavedBill billData={data} hearingData={HearingData2} tableHeaders={table_headers} />
            </Tab>
            <Tab eventKey="bills" title="Bills">
              <Col className="text-center">
                <h2>Bills</h2>
              </Col>
              <SavedBill billData={data} hearingData={HearingData2} tableHeaders={table_headers} />
            </Tab>
            <Tab eventKey="dead-bills" title="Dead Bills">
              <Col className="text-center">
                <h2>Dead Bills</h2>
              </Col>
              <SavedBill billData={data} hearingData={HearingData2} tableHeaders={table_headers} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Stuff" />);
};

export default SavedBills;
