import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { AiOutlineCloud } from "react-icons/ai";
import { BsFillBrightnessHighFill, BsThermometerHalf } from "react-icons/bs";
import {
  WiNightClear,
  WiCloudy,
  WiNightAltRainWind,
  WiStrongWind,
  WiHumidity,
  WiCloudyWindy,
  WiFog,
} from "react-icons/wi";

const Home = () => {
  const [weathers, setweathers] = useState();
  const [inp, setinp] = useState();
  const [raw, setraw] = useState();
  const [desc, setdesc] = useState();
  const [wind, setwind] = useState();
  const [hum, sethum] = useState();
  const [pre, setpre] = useState();
  const [deg, setdeg] = useState();

  const getdata = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=karachi&units=metric&APPID=ac92f0af1dff0b5f4df527ec5e5c8ff7`
      )
      .then((response) => {
        setweathers(response.data);
      });
  };

  const search = (e) => {
    setinp(e.target.value);
  };

  const button = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inp}&units=metric&APPID=ac92f0af1dff0b5f4df527ec5e5c8ff7`
      )
      .then((response) => {
        setraw(response.data);
        setdesc(response.data.weather[0].description);
        setwind(response.data.wind.speed);
        setpre(response.data.main.pressure);
        sethum(response.data.main.humidity);
        setdeg(response.data.wind.deg);
      });
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "3pc" }}>
        <Form.Control
          type="text"
          placeholder="City , Country"
          onChange={search}
          className="input"
        />

        <Button onClick={button} className="btn">
          <span style={{ fontSize: "1.4pc" }}> ☀ </span>
        </Button>
      </div>
      <Card className="card">
        <Card.Body>
          {!raw ? (
            <span className="Empttxt">"No Recod Found"</span>
          ) : (
            <Card.Body style={{ height: "23pc" }}>
              <Card.Body className="iconc">
                {" "}
                <span className="icons">
                  {desc === "few clouds" ? <WiCloudy /> : ""}

                  {desc === "clear sky" ? <WiNightClear /> : ""}

                  {desc === "heavy intensity rain" ? (
                    <WiNightAltRainWind />
                  ) : (
                    ""
                  )}
                  {desc === "scattered clouds" ? <WiCloudyWindy /> : ""}
                  {desc === "smoke" ? <WiFog /> : ""}
                </span>
              </Card.Body>
              <br />
              <span className="temp"> {raw.main.temp} </span> | {desc}
              <br />
              <span className="country">
                {raw.name} , {raw.sys.country}{" "}
              </span>
              <br />
              <br />
              <span className="windi">
                {" "}
                <WiStrongWind />{" "}
              </span>
              <span className="wind">{wind} </span>Wind
              <span className="humi">
                {" "}
                <WiHumidity />{" "}
              </span>
              <span className="hum">{hum} </span> Humidity
              <br />
              <span className="prei">
                {" "}
                <BsThermometerHalf />{" "}
              </span>
              <span className="pre">{pre} </span> Pressure
              <span className="degi"> ° </span>
              <span className="deg">{deg}</span> Degree
            </Card.Body>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
