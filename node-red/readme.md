# Node-Red Flows
This folder holds successive versions of the Node-RED flows used by the Facitrajet guiding device, with more options included each time. This project is presented [here](facitrajet.strikingly.com) and documented [there](http://www.wiki-rennes.fr/MétroMix_2017/FaciTRAJET).

## Setup
Node-RED is executed on a Raspberry Pi 3, using systemd. The flows editor is served on the 1880 port, while a user webinterface is defined on the /ui path.

## Using the nodes
The execution environment is Raspbian Stretch, Node.js 1.0.4 and Node-RED v.0.17. 
The web interface uses the custom "Dashboard" nodes, which must be imported in your library before the flows.



## Licence
Those Node-RED flows, being related to the "Facitrajet" project, are released under the CC-BY-SA licence. The ressources called by the flows (API...) may be under different licencing, which is beyond the scope of this repository.
