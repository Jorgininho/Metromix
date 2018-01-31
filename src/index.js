

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import bus_image from './Bus-100x100.png';
import metro_image from './Metro-100x100.png';
import attente_image from './sablier.png';
import marche_image from './walk.png'

var journey = require('./trajetScript.json'); // forward slashes will depend on the file location
const lignes_bus = require('./ligne_bus.json')

//upper class to generate whole journey, it will parse the JSON file and pass the info to other class
class JourneyMgr extends React.Component {

  render() {
    const journ = this.props.data.journeys[0];
    const depart = journ.sections[0].from.name;
    const arrivee = journ.sections[journ.sections.length -1].to.name;
    return (
      <div>
        <Summary start={depart} end={arrivee}/>
        <Itineraire journey={journ}/>

      </div>
    );
  }
}

class Summary extends React.Component {

  render(){
    return(
      <div>
        <h3>départ</h3> {this.props.start}
        <h3>destination</h3> {this.props.end}
        <hr></hr>
      </div>
    )
  }
}

class Itineraire extends React.Component {

  render(){
    const last = false;

    return (
        <div>
        {this.props.journey.sections.map((item,index)=>(
            <Etape etap={item} />
            ))}
        </div>

      )
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
  constructor(){
    super();
    this.state = {
      image_type : null,
      image_ligne : null,
      ligne_img : "./ligne_",
      destination : null,
      ligne : null
    }
  }


  //conditions to determine the type of step
  render(){

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


    return(
      <div class="etape">
        <span class="white-space: nowrap;">
          <img src={this.state.image_type} className="icon_ligne"/><br/>
          <Image_Ligne ligne={this.state.ligne} json_file={lignes_bus}/>
          {this.state.destination}
        </span>

      </div>
    )
  }
}

class Header extends React.Component {
  render(){
    return(
      <div>
        <h1>
          Facitrajet
        </h1>
      </div>
    )
  }
}
class App extends React.Component {


  render() {

    return (
      <div class="ticket">
          <Header />
        <hr></hr>
          <JourneyMgr  data={journey}/>

      </div>

    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
