import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BookmarkPlusFill, CaretDownFill, CaretRightFill } from 'react-bootstrap-icons';
import { Button, Collapse, Table } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const BillItem = ({ billData: { bill_name, bill_status, bill_number, bill_hearing, _id } }) => {
  const [toggle, setToggle] = useState(true);
  const [collapsableTable, setCollapsableTable] = useState(false);
  return (
    <>
      <tr>
        <td>
          {collapsableTable ? (
            <Button onClick={() => { setCollapsableTable(!collapsableTable); }} aria-expanded={collapsableTable} aria-controls="collapse-table">
              <CaretDownFill size={40} />
            </Button>
          )
            : (
              <Button onClick={() => { setCollapsableTable(!collapsableTable); }} aria-expanded={collapsableTable} aria-controls="collapse-table">
                <CaretRightFill size={40} />
              </Button>
            )}
        </td>
        <td className="text-center">
          <BookmarkPlusFill onClick={() => { setToggle(!toggle); }} size={50} fill={toggle ? '#c4c4c4' : '#E7D27C'} />
        </td>
        <td>{bill_number}</td>
        <td>{bill_name}</td>
        <td>{bill_status}</td>
        <td>{bill_hearing}</td>
        <td>
          <Link className={COMPONENT_IDS.LIST_STUFF_EDIT} to={`/edit/${_id}`}>View Bill</Link>
        </td>
      </tr>
      <tr>
        <td style={{ padding: 0 }} colSpan={7}>
          <Collapse in={collapsableTable}>
            <div id="collapse-table">
              <Table>
                <thead>
                  <tr>
                    <th>Hearing Location</th>
                    <th>Date Introduced</th>
                    <th>Committee</th>
                    <th>Committee</th>
                    <th>Committee</th>
                    <th>Committee</th>
                    <th>Committee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                  </tr>
                  <tr>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                  </tr>
                  <tr>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Collapse>
        </td>
      </tr>
    </>
  );
};

BillItem.propTypes = {
  billData: PropTypes.shape({
    _id: PropTypes.string,
    bill_name: PropTypes.string,
    bill_status: PropTypes.string,
    bill_hearing: PropTypes.string,
    bill_number: PropTypes.number,
  }).isRequired,
};

export default BillItem;
