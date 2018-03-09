import React, { Component } from 'react';
import html2canvas from 'html2canvas';

import logo from './logo.svg';
import './App.css';
import imgtest from './test.jpg'

import bus_image from './img/Bus-100x100.png';
import metro_image from './img/Metro-100x100.png';
import attente_image from './img/sablier.png';
import marche_image from './img/walk.png';

var journey = require('./trajetScript.json'); // forward slashes will depend on the file location
const lignes_bus = require('./ligne_bus.json');


//Class to handle the journey
class Journey_Mgr extends React.Component {
  render() {
    let depart = journey.journeys[0].sections[0];
    console.log('depart'+depart);
    console.log(journey.journeys[0].sections[0]);
    return (
      <div id="ticket" className="ticket">
        <h1>Facitrajet</h1>
        <h3>Départ : </h3> {journey.journeys[0].sections[0].from.name}
        <h3>Arrivée :</h3> {journey.journeys[0].sections[journey.journeys[0].sections.length-1].from.name}

            <div id="etape" className="etape">
              {journey.journeys[0].sections.map((item,index)=>(
                <Etape etap={item} />
              ))}
            </div>

      </div>
  )
    //
  }
}

class Image_Ligne extends React.Component {
  constructor(props){
    super(props);
    this.triImage=this.triImage.bind(this);
    this.state = {
      image:null
    };
  }

  triImage (ligne){
    if (ligne.Ligne_nom_court===this.props.ligne){
      this.state.image=ligne.Image;
      console.log(this.props.ligne);
      }
  }

  render (){
    lignes_bus.map((item,index)=>(
      this.triImage(item)
    ))

    return (
  <div>
    <img className="icon_ligne" src={this.state.image} />
  </div>
)
}
}


class Etape extends React.Component {
  constructor() {
    super();
    this.state = {
      image_type : null,
      image_ligne : null,
      ligne_img : "./ligne_",
      destination : null,
      ligne : null
    }
  }

  render () {

    if (this.props.etap.mode){
      if (this.props.etap.mode==="walking" || this.props.etap.transfer_type==="walking"){
        this.state.image_type=marche_image;
        this.state.destination="marcher jusqu'à "+this.props.etap.from.name
      }
    }
    if (this.props.etap.display_informations){
      if (this.props.etap.display_informations.physical_mode==="Tramway"){
        this.state.image_type="./tramway.bmp",
        this.state.image_ligne=this.state.ligne.concat(this.props.etap.display_informations.label+".bmp"),
        this.state.ligne = this.props.etap.display_informations.label
        this.state.destination="à l'arret " + this.props.etap.from.name +" prendre ligne : "+ this.state.ligne + " direction :" + this.props.etap.display_informations.direction + "descendre à l'arrêt " + this.props.etap.to.stop_point.name
      }

      if (this.props.etap.display_informations.physical_mode==="Bus") {
        this.state.image_type=bus_image,
        this.state.image_ligne=this.state.ligne_img.concat(this.props.etap.display_informations.label+".bmp"),
        this.state.ligne = this.props.etap.display_informations.label
        //console.log(this.state.ligne);
        this.state.destination="à l'arret " + this.props.etap.from.name +" prendre ligne : "+ this.state.ligne + " direction :" + this.props.etap.display_informations.direction + "descendre à l'arrêt " + this.props.etap.to.stop_point.name
      };
      if (this.props.etap.display_informations.physical_mode==="Métro") {
        this.state.image_type=metro_image,
        this.state.image_ligne=this.state.ligne_img.concat(this.props.etap.display_informations.label+".bmp"),
        this.state.ligne = this.props.etap.display_informations.label,
        console.log(this.state.ligne);
        this.state.destination="à l'arret " + this.props.etap.from.name +" prendre ligne : "+ this.state.ligne + " direction :" + this.props.etap.display_informations.direction + "descendre à l'arrêt " + this.props.etap.to.stop_point.name
      };
    }
    if (this.props.etap.type){
      if (this.props.etap.type==="waiting"){
        this.state.destination="attendre "+this.props.etap.duration+" secondes",
        this.state.image_type=attente_image

      }
    }

    return (
      <div className="etape">
        <p>
          <img src={this.state.image_type} className="icon_ligne"/>
          <Image_Ligne ligne={this.state.ligne} json_file={lignes_bus}/>
          {this.state.destination}
        </p>
      </div>
    )
  }
}

class App extends Component {
  state = {
    displayCanvas: false,
  }

  onClick = () => {
    html2canvas(document.getElementById('ticket')).then((canvas) => {
      const canvas2 = canvas;
      this.setState({ displayCanvas: true });
      document.getElementById('ticket').appendChild(canvas);

      const dataUrl = canvas.toDataURL();
      console.log(dataUrl);
      // let windowContent = '<!DOCTYPE html>';
      // windowContent += '<html>';
      // windowContent += '<head><title>Print canvas</title></head>';
      // windowContent += '<body>';
      // windowContent += '<img src="' + dataUrl + '">';
      // windowContent += '</body>';
      // windowContent += '</html>';
      //
      // const printWin = window.open('', '', 'width=1000' ,'height=1000');
      // printWin.document.open();
      // printWin.document.write(windowContent);
      //
      // printWin.document.addEventListener('load', function() {
      //     printWin.focus();
      //     printWin.print();
      //     printWin.document.close();
      //     printWin.close();
      // }, true);


    });
  }

  render() {
    return (
      <div className="App">
          <Journey_Mgr />

          {/* <canvas style={{ position: 'absolute', width: 500, height: 500 }} /> */}
        <button onClick={this.onClick}>capture</button>
      {
        this.state.displayCanvas && (
          <div
            style={{
              position: 'absolute',
              width: 1900,
              height: 1000,
              top: 0,
              left: 0,
              backgroundColor: 'red',
            }}
            id='test'
        />
        )
      }

      </div>
    );
  }
}

export default App;
