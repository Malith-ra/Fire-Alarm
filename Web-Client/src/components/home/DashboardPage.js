import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchSensors } from "../../actionControllers/sensor";
import { Card, Image } from "semantic-ui-react";
import Inactive from "./Inactive.png";
import Active from "./active.jpg";

class DashboardPage extends React.Component {
  intervalID;

  componentDidMount = () => {
    this.props.fetchSensors();
    this.intervalID = setInterval(this.props.fetchSensors, 40000);
  };
  
  componentWillUnmount() {
    /*
      stop getData() from continuing to run even
      after unmounting this component
    */
    clearInterval(this.intervalID);
  }


  render() {
    
    return (
      <div className="page-wrapper dashboard">
        <Card.Group itemsPerRow={4}>
          {this.props.sensors &&
            this.props.sensors.map((sensor,index) => {
              const notifyCondition=(sensor.smokeLevel > 5) || (sensor.co2Value > 5);
              return (
                <Card key={index}>
                  <Card.Content className={ notifyCondition  ? 'dangerLevel' : 'noDanger' }>
                    {notifyCondition ? (
                      <Image floated="right" size="mini" src={Inactive} />
                    ) : (
                      <Image floated="right" size="mini" src={Active} />
                    )}
                    <Card.Header>
                      {sensor.sensorName ? sensor.sensorName : "N/A"}
                    </Card.Header>
                    <Card.Description>
                      Sensor Status :
                      <strong>
                        {sensor.status === 0 ? "Deactivate" : "Active"}
                      </strong>
                      <br />
                      Room Number :{" "}
                      <strong>{sensor.roomNo ? sensor.roomNo : "N/A"}</strong>
                      <br />
                      Floor Number :{" "}
                      <strong>{sensor.floorNo ? sensor.floorNo : "N/A"}</strong>
                      <br />
                      location Name :{" "}
                      <strong>
                        {sensor.locationName ? sensor.locationName : "N/A"}
                      </strong>
                      <br />
                      Co2 Level :{" "}
                      <strong>
                        {sensor.co2Value ? sensor.co2Value : "N/A"}
                      </strong>
                      <br />
                      Smoke Level :{" "}
                      <strong>
                        {sensor.smokeLevel ? sensor.smokeLevel : "N/A"}
                      </strong>
                      <br />
                    </Card.Description>
                  </Card.Content>
                </Card>
              );
            })}
        </Card.Group>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  fetchSensors: PropTypes.func.isRequired,
  sensors: PropTypes.arrayOf(
    PropTypes.shape({
      sensorId: PropTypes.number.isRequired,
    }).isRequired
  )
};

function mapStateToProps(state) {
  return {
    sensors: state.sensors.sensors,
  };
}

export default connect(mapStateToProps, { fetchSensors })(DashboardPage);
