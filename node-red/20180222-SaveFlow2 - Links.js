[
    {
        "id": "66742219.78aae4",
        "type": "tab",
        "label": "Principal",
        "disabled": false,
        "info": "Ce Flow coordonne l'ensemble du processus\nde guidage d'un usager"
    },
    {
        "id": "c4533850.8cad58",
        "type": "tab",
        "label": "Front End HTML",
        "disabled": false,
        "info": ""
    },
    {
        "id": "60a22c37.fde43c",
        "type": "tab",
        "label": "Vocal",
        "disabled": false,
        "info": ""
    },
    {
        "id": "60624e73.277388",
        "type": "inject",
        "z": "66742219.78aae4",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "num",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 90,
        "y": 40,
        "wires": [
            [
                "ed500494.46d0a",
                "69ad2fb3.8b9708"
            ]
        ]
    },
    {
        "id": "41d3c085.28be38",
        "type": "debug",
        "z": "66742219.78aae4",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "true",
        "x": 696.8888549804688,
        "y": 578.888916015625,
        "wires": []
    },
    {
        "id": "2681ddc9.6044f2",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "Heure-date",
        "func": "\n// Create a Date object\nvar now = Date.now();\n// Départ dans 5 minutes soit 300s soit 300_000ms\nvar date = new Date(now+300000);\n// Change the payload to be a formatted Date string (format attendu par API Navitia)\nmsg.date = date.toISOString()\n\n// Return the message so it can be sent on\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 165,
        "y": 476,
        "wires": [
            [
                "d7a403a8.73ffd"
            ]
        ]
    },
    {
        "id": "99006643.fc5ef",
        "type": "http request",
        "z": "66742219.78aae4",
        "name": "Calcul Trajet Navitia",
        "method": "GET",
        "ret": "obj",
        "url": "https://api.navitia.io/v1/journeys?from={{start}}&to={{dest}}&datetime={{date}}&max_nb_journeys=1",
        "tls": "",
        "x": 397,
        "y": 515,
        "wires": [
            [
                "aa19c13c.b31398",
                "130f6e58.9f4dda",
                "5d8f4889.0f7128"
            ]
        ],
        "inputLabels": [
            "Requete"
        ],
        "outputLabels": [
            "résultat JSON"
        ]
    },
    {
        "id": "69ad2fb3.8b9708",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "Entrée Destination",
        "func": "msg.dest = {};\n//msg.dest = 'stop_point:STA:SP:5020';\nmsg.dest = \"Republique\"\n\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 153,
        "y": 159,
        "wires": [
            [
                "c3a5f210.82f638"
            ]
        ]
    },
    {
        "id": "5d0976e3.85772",
        "type": "debug",
        "z": "66742219.78aae4",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "payload.places[0].name",
        "x": 618.6666259765625,
        "y": 400.2221984863281,
        "wires": []
    },
    {
        "id": "aa19c13c.b31398",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "Brique Julien JSON",
        "func": "// A ECRIRE\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 454.5,
        "y": 657,
        "wires": [
            [
                "41d3c085.28be38"
            ]
        ]
    },
    {
        "id": "ed500494.46d0a",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "CONST Empl. Borne",
        "func": "// Définit l'emplacement de la borne comme le point de départ\n// accessible à tous les nodes\nglobal.set(\"emplacement\", \"stop_point:STA:SP:1536\");\n//Arrêt : Clos Courtel\nmsg.payload = 'on est partis !'\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 302.5,
        "y": 20,
        "wires": [
            [
                "d18f6dc.61aed9"
            ]
        ]
    },
    {
        "id": "21cfe13e.f39ea6",
        "type": "exec",
        "z": "66742219.78aae4",
        "command": "pcsc_scan -n",
        "addpay": false,
        "append": "",
        "useSpawn": "true",
        "timer": "",
        "oldrc": false,
        "name": "Détection Carte",
        "x": 120,
        "y": 100,
        "wires": [
            [
                "1d08b37.769fccd"
            ],
            [],
            []
        ]
    },
    {
        "id": "cddbb3f4.e99628",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "Définition Profil",
        "func": "\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 88,
        "y": 611,
        "wires": [
            []
        ]
    },
    {
        "id": "18f04dba.f17f4a",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "Comparaison Profil/parcours",
        "func": "// s'inspirer de \n//http://doc.navitia.io/#journey-qualification-process\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 196.888916015625,
        "y": 656.8888549804688,
        "wires": [
            []
        ]
    },
    {
        "id": "fd0a1642.3b45c8",
        "type": "exec",
        "z": "66742219.78aae4",
        "command": "",
        "addpay": true,
        "append": "",
        "useSpawn": "false",
        "timer": "",
        "oldrc": false,
        "name": "Impression locale",
        "x": 671.5,
        "y": 638.5,
        "wires": [
            [],
            [],
            []
        ]
    },
    {
        "id": "db23f68c.9bd4f",
        "type": "file",
        "z": "66742219.78aae4",
        "name": "Ecriture Fichier",
        "filename": "/home/facitrajet/Codes-Node-RED/TEST-output",
        "appendNewline": true,
        "createDir": true,
        "overwriteFile": "false",
        "x": 662.5,
        "y": 697,
        "wires": []
    },
    {
        "id": "e3c32c18.7bd16",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "Auth Header",
        "func": "msg.headers = {}\nmsg.headers['Authorization'] = global.get(\"TokenNavitia\");\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 140,
        "y": 285,
        "wires": [
            [
                "eb8011d.90eef7"
            ]
        ],
        "inputLabels": [
            "message"
        ],
        "outputLabels": [
            "message+headers"
        ]
    },
    {
        "id": "eb8011d.90eef7",
        "type": "http request",
        "z": "66742219.78aae4",
        "name": "Recherche Dest Navitia",
        "method": "GET",
        "ret": "obj",
        "url": "https://api.navitia.io/v1/coverage/fr-bre/places?q={{dest}}&type[]=stop_point&from\"48.1113;-1.6794\"",
        "tls": "",
        "x": 200,
        "y": 336,
        "wires": [
            [
                "5d0976e3.85772",
                "1b131af.2d63c65",
                "40afa6d9.5994b"
            ]
        ],
        "inputLabels": [
            "Requete"
        ],
        "outputLabels": [
            "résultat JSON"
        ]
    },
    {
        "id": "1d08b37.769fccd",
        "type": "switch",
        "z": "66742219.78aae4",
        "name": "Filtre Insertion/retrait",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "cont",
                "v": "inserted",
                "vt": "str"
            }
        ],
        "checkall": "true",
        "outputs": 1,
        "x": 340,
        "y": 80,
        "wires": [
            []
        ]
    },
    {
        "id": "5da9c255.05f13c",
        "type": "comment",
        "z": "66742219.78aae4",
        "name": "Calcul Dest",
        "info": "Le listing des destinations par l'API se fait \nà partir d'un point de départ géographique.\nCelui indiqué est l'Hotel de Ville.\n\nadmin_uri[]=admin:fr:35238 // commune de Rennes\ndisable_geojson=True // réduit la BP nécessaire",
        "x": 76.72218322753906,
        "y": 391.9999694824219,
        "wires": []
    },
    {
        "id": "40afa6d9.5994b",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "Points Dep-Arr",
        "func": "msg.dest = {};\n\nmsg.dest = msg.payload.places[0].id;\n\nvar depart = global.get(\"emplacement\");\nmsg.start = {};\nmsg.start = depart;\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 163,
        "y": 441,
        "wires": [
            [
                "2681ddc9.6044f2"
            ]
        ]
    },
    {
        "id": "d18f6dc.61aed9",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "CONST Token Navitia",
        "func": "\n// Définit le token d'appel Navitia\n// accessible à tous les nodes\nglobal.set(\"TokenNavitia\", \"dea0d6a8-7c09-40d7-b9a3-7c19f9f57ef7\");\n\nmsg.payload = 'on est partis !'\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 526,
        "y": 20,
        "wires": [
            []
        ],
        "inputLabels": [
            "message"
        ],
        "outputLabels": [
            "message+headers"
        ]
    },
    {
        "id": "d7a403a8.73ffd",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "Auth Header",
        "func": "msg.headers = {}\nmsg.headers['Authorization'] = global.get(\"TokenNavitia\");\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 201,
        "y": 521,
        "wires": [
            [
                "99006643.fc5ef"
            ]
        ],
        "inputLabels": [
            "message"
        ],
        "outputLabels": [
            "message+headers"
        ]
    },
    {
        "id": "ef0de09b.c899d8",
        "type": "http in",
        "z": "c4533850.8cad58",
        "name": "/test?q=",
        "url": "/test",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 147,
        "y": 131,
        "wires": [
            [
                "75ea4064.68623"
            ]
        ]
    },
    {
        "id": "4290e564.958dac",
        "type": "http response",
        "z": "c4533850.8cad58",
        "name": "Réponse HTTP",
        "statusCode": "",
        "headers": {},
        "x": 529.5,
        "y": 147,
        "wires": []
    },
    {
        "id": "88a39aad.698298",
        "type": "comment",
        "z": "c4533850.8cad58",
        "name": "Essai FrontEnd requetes",
        "info": "",
        "x": 198,
        "y": 94,
        "wires": []
    },
    {
        "id": "75ea4064.68623",
        "type": "template",
        "z": "c4533850.8cad58",
        "name": "message HTML",
        "field": "payload",
        "fieldType": "msg",
        "format": "handlebars",
        "syntax": "mustache",
        "template": "This is the payload: {{payload.q}} ! </br>\n<a href=http://metromix.io> lien vers metromix </a>",
        "output": "str",
        "x": 341,
        "y": 155,
        "wires": [
            [
                "4290e564.958dac"
            ]
        ]
    },
    {
        "id": "c3a5f210.82f638",
        "type": "join",
        "z": "66742219.78aae4",
        "name": "Join",
        "mode": "custom",
        "build": "array",
        "property": "payload",
        "propertyType": "msg",
        "key": "topic",
        "joiner": "\\n",
        "joinerType": "str",
        "accumulate": false,
        "timeout": "",
        "count": "2",
        "x": 335.5,
        "y": 206,
        "wires": [
            [
                "4b56e742.f2ace8"
            ]
        ],
        "inputLabels": [
            "Process"
        ],
        "outputLabels": [
            "Demande clavier ajoutée"
        ]
    },
    {
        "id": "f9b4344f.5dac9",
        "type": "http in",
        "z": "66742219.78aae4",
        "name": "Input Usager /a?dest=",
        "url": "/a",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 119,
        "y": 199,
        "wires": [
            [
                "4a4e3b3a.cc8da4",
                "c3a5f210.82f638",
                "a7809823.2f9d"
            ]
        ]
    },
    {
        "id": "1da1afd0.dc4ad8",
        "type": "http response",
        "z": "66742219.78aae4",
        "name": "Affiche Dest demandée",
        "statusCode": "",
        "headers": {},
        "x": 670,
        "y": 160,
        "wires": []
    },
    {
        "id": "4a4e3b3a.cc8da4",
        "type": "template",
        "z": "66742219.78aae4",
        "name": "Demande",
        "field": "payload",
        "fieldType": "msg",
        "format": "handlebars",
        "syntax": "mustache",
        "template": "La destination demandée est : {{payload.dest}} .\nLa destination trouvée sera ici : <a href=/at> destination trouvée </a>",
        "output": "str",
        "x": 440,
        "y": 160,
        "wires": [
            [
                "1da1afd0.dc4ad8"
            ]
        ]
    },
    {
        "id": "4b56e742.f2ace8",
        "type": "switch",
        "z": "66742219.78aae4",
        "name": "Filtre Bon Ordre",
        "property": "payload[1].dest",
        "propertyType": "msg",
        "rules": [
            {
                "t": "nnull"
            }
        ],
        "checkall": "true",
        "outputs": 1,
        "x": 487,
        "y": 203,
        "wires": [
            [
                "3c4cb6f.217484a"
            ]
        ]
    },
    {
        "id": "3c4cb6f.217484a",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "Format Dest",
        "func": "msg.dest = msg.payload[1].dest;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 148.5,
        "y": 252,
        "wires": [
            [
                "e3c32c18.7bd16"
            ]
        ]
    },
    {
        "id": "1b131af.2d63c65",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "GLOBAL Dest trouvée",
        "func": "// accessible à tous les nodes\nglobal.set(\"DestiTrouve\", msg.payload.places[0]);\n\nmsg.payload = msg.payload.places[0].name\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 446.11114501953125,
        "y": 308.33331298828125,
        "wires": [
            [
                "8f2645ae.cc33a"
            ]
        ]
    },
    {
        "id": "9ca02f1d.409c3",
        "type": "play audio",
        "z": "60a22c37.fde43c",
        "name": "TTS",
        "voice": "51",
        "x": 590,
        "y": 200,
        "wires": []
    },
    {
        "id": "288eb1b6.a33026",
        "type": "function",
        "z": "60a22c37.fde43c",
        "name": "TrajetFourni",
        "func": "depart = msg.payload.journeys[0].sections[0].from.name;\narrive = msg.payload.journeys[0].sections.slice(-1)[0].to.name;\nmsg.payload = \"Le trajet entre \" + depart + \"et \" + arrive + \"a été fourni.\";\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 270,
        "y": 200,
        "wires": [
            [
                "9ca02f1d.409c3"
            ]
        ]
    },
    {
        "id": "319813f3.a432d4",
        "type": "link in",
        "z": "60a22c37.fde43c",
        "name": "Trajet Fourni",
        "links": [
            "130f6e58.9f4dda"
        ],
        "x": 135,
        "y": 200,
        "wires": [
            [
                "288eb1b6.a33026"
            ]
        ]
    },
    {
        "id": "130f6e58.9f4dda",
        "type": "link out",
        "z": "66742219.78aae4",
        "name": "Trajet Fourni",
        "links": [
            "319813f3.a432d4"
        ],
        "x": 556.111083984375,
        "y": 495,
        "wires": []
    },
    {
        "id": "f263fcac.f05c7",
        "type": "link out",
        "z": "66742219.78aae4",
        "name": "Dest Demand",
        "links": [
            "91b7f839.7e6038"
        ],
        "x": 575,
        "y": 120,
        "wires": []
    },
    {
        "id": "91b7f839.7e6038",
        "type": "link in",
        "z": "60a22c37.fde43c",
        "name": "Dest Demandée",
        "links": [
            "f263fcac.f05c7"
        ],
        "x": 135,
        "y": 140,
        "wires": [
            [
                "99e32ce8.fc9bf"
            ]
        ]
    },
    {
        "id": "99e32ce8.fc9bf",
        "type": "function",
        "z": "60a22c37.fde43c",
        "name": "Dest demandée",
        "func": "msg.payload = \"La destination demandée est\" + msg.payload ;\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 280,
        "y": 140,
        "wires": [
            [
                "9ca02f1d.409c3"
            ]
        ]
    },
    {
        "id": "8f2645ae.cc33a",
        "type": "link out",
        "z": "66742219.78aae4",
        "name": "Dest Trouvée",
        "links": [
            "a657cb7f.3d218"
        ],
        "x": 629.4444580078125,
        "y": 308.33331298828125,
        "wires": []
    },
    {
        "id": "2a1077c.af99108",
        "type": "http in",
        "z": "c4533850.8cad58",
        "name": "/at",
        "url": "/at",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 140.00003051757812,
        "y": 277.77777099609375,
        "wires": [
            [
                "549ab3a7.a5c56c"
            ]
        ]
    },
    {
        "id": "6c50b61.4bcb1c8",
        "type": "http response",
        "z": "c4533850.8cad58",
        "name": "Affiche Dest Trouvée",
        "statusCode": "",
        "headers": {},
        "x": 526.6667175292969,
        "y": 278.8888854980469,
        "wires": []
    },
    {
        "id": "549ab3a7.a5c56c",
        "type": "function",
        "z": "c4533850.8cad58",
        "name": "Nom DestiTrouve",
        "func": "msg.payload = \"La destination trouvée est : \" + global.get(\"DestiTrouve\").name + \".\";\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 308.8888854980469,
        "y": 277.77777099609375,
        "wires": [
            [
                "6c50b61.4bcb1c8"
            ]
        ]
    },
    {
        "id": "ff4b6689.b0c268",
        "type": "comment",
        "z": "c4533850.8cad58",
        "name": "Dest trouvée",
        "info": "Affichage de la destination trouvée\nà partir de l'indication Usager",
        "x": 160.55557250976562,
        "y": 236.66665649414062,
        "wires": []
    },
    {
        "id": "a657cb7f.3d218",
        "type": "link in",
        "z": "60a22c37.fde43c",
        "name": "Dest Trouvée",
        "links": [
            "8f2645ae.cc33a"
        ],
        "x": 135,
        "y": 260,
        "wires": [
            [
                "daff8fec.846af8"
            ]
        ]
    },
    {
        "id": "daff8fec.846af8",
        "type": "function",
        "z": "60a22c37.fde43c",
        "name": "Dest Trouvée",
        "func": "msg.payload = \"La destination trouvée est\" + msg.payload;\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 270,
        "y": 260,
        "wires": [
            [
                "9ca02f1d.409c3"
            ]
        ]
    },
    {
        "id": "a7809823.2f9d",
        "type": "template",
        "z": "66742219.78aae4",
        "name": "Dest Demandée",
        "field": "payload",
        "fieldType": "msg",
        "format": "handlebars",
        "syntax": "mustache",
        "template": "{{payload.dest}}",
        "output": "str",
        "x": 460,
        "y": 120,
        "wires": [
            [
                "f263fcac.f05c7"
            ]
        ]
    },
    {
        "id": "5d8f4889.0f7128",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "TrajetFourni",
        "func": "depart = msg.payload.journeys[0].sections[0].from.name;\narrive = msg.payload.journeys[0].sections.slice(-1)[0].to.name;\ndate  = Date().toString();\nmsg.payload = date + \" : Le trajet entre \" + depart + \" et \" + arrive + \" a été fourni.\";\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 470,
        "y": 700,
        "wires": [
            [
                "db23f68c.9bd4f"
            ]
        ]
    }
]