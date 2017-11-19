#include <Adafruit_Thermal.h>
#include "Adafruit_Thermal.h"
#include "faciTRAJET.h"
#include "logo_metro.h"
#include "logo_bus.h"


#include "SoftwareSerial.h"
#define TX_PIN 6 // Arduino transmit  YELLOW WIRE  labeled RX on printer
#define RX_PIN 5 // Arduino receive   GREEN WIRE   labeled TX on printer

//Branchement bouton entre +5V (niveau HIGH) et le pin 8, avec un rappel au niveau LOW par résistance 10kOhms entre 8 et GND.
#define BOUTON 8 // Bouton poussoir de lancement d'impression
#define ledPin 13 // LED affichage sur la carte Arduino
int EtatBouton = 0;

SoftwareSerial mySerial(RX_PIN, TX_PIN); // Declare SoftwareSerial obj first
Adafruit_Thermal printer(&mySerial);     // Pass addr to printer constructor
// Then see setup() function regarding serial & printer begin() calls.



void setup() {
  mySerial.begin(19200);  // Initialize SoftwareSerial
  printer.begin();        // Init printer
  pinMode(BOUTON, INPUT);
  pinMode(ledPin, OUTPUT);

 
}

void loop() {

  EtatBouton = digitalRead(BOUTON);

  // Vérifier l'état bouton (HIGH si appuyé)
  if (EtatBouton == HIGH) {
    //Si bouton appuye, on imprime:
    digitalWrite(ledPin, HIGH);
  
  // ## IMPRESSION TITRE ##
  printer.justify('C'); //Justif 'L', 'C' ou 'R'
  printer.setSize('L'); // Taille 'S' 'M' ou 'L'

  printer.println(F("----------"));
  printer.inverseOn();
  printer.doubleHeightOn();
  printer.print(F("Faci"));
  printer.boldOn();
  printer.println(F("TRAJET"));
  printer.boldOff();
  printer.doubleHeightOff();
  printer.inverseOff();
  printer.println(F("----------"));
  printer.printBitmap(faciTRAJET_width, faciTRAJET_height, faciTRAJET_data);
  printer.println();

// ## IMPRESSION DEPART ##
 printer.justify('L'); printer.setSize('L'); 
 printer.doubleHeightOn();
 printer.println(F("Depart :"));
   printer.boldOn();
 printer.println(F("Clos Courtel"));
   printer.boldOff();
printer.println();

// ## IMPRESSION ARRIVEE ##
 printer.justify('L'); printer.setSize('L'); 
 printer.doubleHeightOn();
 printer.println(F("Arrivee :"));
   printer.boldOn();
 printer.println(F("Sainte Anne"));
   printer.boldOff();
 printer.println();
 printer.println(F("----------"));
 printer.println();
 
// ## IMPRESSION TRAJET ##

 printer.justify('C'); printer.setSize('L'); 
 printer.doubleHeightOn();
 printer.println(F("Votre Itineraire :"));
 
 printer.justify('L'); printer.setSize('L'); 
 printer.println(F("Clos Courtel"));
 printer.printBitmap(logo_bus_width, logo_bus_height, logo_bus_data);
 printer.doubleHeightOn();
 printer.inverseOn();printer.print(F(" C4 "));
 printer.inverseOff();printer.println(F(" => Republique"));
  
  printer.doubleHeightOff();
  printer.println(F("*"));
  printer.println(F("*"));
  printer.println(F("*"));
  printer.println(F("* Musee des Beaux Arts"));
  printer.doubleHeightOn();
  printer.inverseOn();printer.print(F(" STOP "));
  printer.inverseOff();printer.println(F(" Republique"));
  printer.println();

 //printer.print(F("METRO - ")); 
 printer.printBitmap(logo_metro_width, logo_metro_height, logo_metro_data);
 printer.doubleHeightOn(); printer.justify('L'); printer.setSize('L'); 
 printer.inverseOn();printer.print(F(" A "));
 printer.inverseOff();printer.println(F(" => Kennedy"));
  printer.println();
  printer.inverseOn();printer.print(F("STOP"));
  printer.inverseOff();printer.println(F(" Sainte Anne"));
  printer.println();
  printer.println(F("=== VOUS ETES ARRIVEE ! ==="));
  printer.println();
  printer.println();


  } else {
    // Si bonton non-appuye, on attend
    digitalWrite(ledPin, LOW);
    delay(1000L);
    
      // Test inverse on & off

  }


}
