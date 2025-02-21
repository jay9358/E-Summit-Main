import React from 'react';
import "./events.css";
import Card from './Card';
import w from '../OurTeam/Images/WhatsApp Image 2025-02-20 at 19.25.19_2c35fa89.jpg'
import w2 from '../OurTeam/Images/WhatsApp Image 2025-02-20 at 19.27.45_aa15d1a7.jpg'
import sandeep from "../images/sandeep.png";
function Events() {
  const eventsData = [
    // https://res.cloudinary.com/dr0b2iifb/image/upload/v1704993566/REV4_klv16m.png
    {
        imageUrl: w,
        title: "Vijender Chauhan",
        description1: "TIME-TBD",
        description2: "VENUE-TBD",
        one: "Esteemed Drishti IAS mentor sharing expertise on civil services preparation and strategy."
      },
      {
        imageUrl: w2,
        title: "Paresh Gupta",
        description1: "TIME-TBD",
        description2: "VENUE-TBD",
        one: "Experienced investor sharing insights on navigating markets and scaling businesses"
      },
      {
        imageUrl: 'https://res.cloudinary.com/dr0b2iifb/image/upload/v1704993566/REV4_klv16m.png',
        title: "Speaker 3",
        description1: "TIME-TBD",
        description2: "VENUE-TBD",
        one: "AI company CEO sharing insights on innovation, industry trends, and future technologies."
      }
      // {
      //   imageUrl: 'https://res.cloudinary.com/dqcrzyxnt/image/upload/q_auto/f_auto/v1704745251/esummit/workshop2_joyqmx.jpg',
      //   title: "Workshop - 2",
      //   description1: "TIME-TBD",
      //   description2: "VENUE-TBD",
      //   one: "Practical knowledge by experienced entrepreneurs of real world"
      // },
      // {
      //   imageUrl: edm,
      //   title: "Pronite",
      //   description1: "TIME-TBD",
      //   description2: "VENUE-TBD",
      //   one: "Let the beats ignite your spirit at an electrifying EDM night!"
      // }
  ];

  return (
    <>
    <div id="Events_container">
    <div id='Events'>
        <h1 className='evh'><span className="text_s">EVENTS</span></h1>
        <div className="events-container"> 

        <div className="events-grid">
      {eventsData.map((event, index) => (
        <Card
          key={index}
          imageUrl={event.imageUrl}
          title={event.title}
          description1={event.description1}
          description2={event.description2}
          one={event.one}
        />
      ))}
  </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default Events;
