

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var journey = require('./trajetScript.json'); // forward slashes will depend on the file location

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
      <div><b>départ</b> {this.props.start} </div>
      <div><b>destination</b> {this.props.end} </div>
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
        this.state.image_type="walking.bmp";
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
        this.state.image_type="./bus.bmp",
        this.state.image_ligne=this.state.ligne_img.concat(this.props.etap.display_informations.label+".bmp"),
        this.state.ligne = this.props.etap.display_informations.label
        this.state.destination="à l'arret " + this.props.etap.from.name +" prendre ligne : "+ this.state.ligne + " direction :" + this.props.etap.display_informations.direction + "descendre à l'arrêt " + this.props.etap.to.stop_point.name
      };
      if (this.props.etap.display_informations.physical_mode==="Métro") {
        this.state.image_type="./bus.bmp",
        this.state.image_ligne=this.state.ligne_img.concat(this.props.etap.display_informations.label+".bmp"),
        this.state.ligne = this.props.etap.display_informations.label
        this.state.destination="à l'arret " + this.props.etap.from.name +" prendre ligne : "+ this.state.ligne + " direction :" + this.props.etap.display_informations.direction + "descendre à l'arrêt " + this.props.etap.to.stop_point.name
      };
    }
    if (this.props.etap.type){
      if (this.props.etap.type==="waiting"){
        this.state.destination="attendre "+this.props.etap.duration+" secondes"
      }
    }


    return(
      <div>
        {/*<img src={require(this.state.image_type)}/>*/}
        {/*//<img src={require('./tramway.bmp')}/>*/}
        {/*<img src={s.state.image_ligne}/>*/}
        {/*<img src={require(this.state.image_type)}/>*/}
        {this.state.destination}


      </div>
    )
  }
}

class Header extends React.Component {
  render(){
    return(
      <div>
      <img src=''/>
      <img src=''/>
      </div>
    )
  }
}
class App extends React.Component {


  render() {

    return (
      <div >
          <Header />
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
