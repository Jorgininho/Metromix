[
    {
        "id": "66742219.78aae4",
        "type": "tab",
        "label": "Flow 1",
        "disabled": false
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
                "21cfe13e.f39ea6"
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
        "complete": "payload",
        "x": 642,
        "y": 380,
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
        "y": 389,
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
        "y": 428,
        "wires": [
            [
                "4cce631.39eaf9c"
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
        "func": "msg.dest = {};\n//msg.dest = 'stop_point:STA:SP:5020';\nmsg.dest = \"Saint Etienne\"\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 210,
        "y": 200,
        "wires": [
            [
                "e3c32c18.7bd16"
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
        "complete": "payload.places[0].id",
        "x": 612,
        "y": 323,
        "wires": []
    },
    {
        "id": "aa19c13c.b31398",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "Brique Julien JSON",
        "func": "// A ECRIRE\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 454.5,
        "y": 486,
        "wires": [
            [
                "fd0a1642.3b45c8",
                "db23f68c.9bd4f"
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
        "id": "8ce5cef7.c8c6c",
        "type": "play audio",
        "z": "66742219.78aae4",
        "name": "TTS",
        "voice": "51",
        "x": 648.5,
        "y": 169,
        "wires": []
    },
    {
        "id": "4cce631.39eaf9c",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "Interface Vocale",
        "func": "\nmsg.payload = \"Le trajet est fourni.\";\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 496.5,
        "y": 169,
        "wires": [
            [
                "8ce5cef7.c8c6c"
            ]
        ]
    },
    {
        "id": "fd8f56b9.cc54d8",
        "type": "http in",
        "z": "66742219.78aae4",
        "name": "Accueil",
        "url": "/test",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 67.5,
        "y": 604,
        "wires": [
            [
                "7a0d5fda.1dd368"
            ]
        ]
    },
    {
        "id": "c9fc9c98.c9f978",
        "type": "http response",
        "z": "66742219.78aae4",
        "name": "Retour Accueil",
        "statusCode": "",
        "headers": {},
        "x": 460,
        "y": 620,
        "wires": []
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
        "name": "Détection Insertion SC",
        "x": 189.5,
        "y": 82.5,
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
        "x": 395,
        "y": 106,
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
        "x": 228,
        "y": 487,
        "wires": [
            [
                "aa19c13c.b31398"
            ]
        ]
    },
    {
        "id": "e9cbbd58.2fd3a8",
        "type": "comment",
        "z": "66742219.78aae4",
        "name": "Essai FrontEnd requetes",
        "info": "",
        "x": 128.5,
        "y": 567,
        "wires": []
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
        "y": 467.5,
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
        "filename": "/home/facitrajet/metromix/node-red/TEST",
        "appendNewline": true,
        "createDir": true,
        "overwriteFile": "false",
        "x": 662.5,
        "y": 526,
        "wires": []
    },
    {
        "id": "7a0d5fda.1dd368",
        "type": "http request",
        "z": "66742219.78aae4",
        "name": "",
        "method": "GET",
        "ret": "txt",
        "url": "http://localhost:3000",
        "tls": "",
        "x": 250,
        "y": 600,
        "wires": [
            [
                "c9fc9c98.c9f978"
            ]
        ]
    },
    {
        "id": "e3c32c18.7bd16",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "Auth Header",
        "func": "msg.headers = {}\nmsg.headers['Authorization'] = global.get(\"TokenNavitia\");\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 185,
        "y": 249,
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
        "y": 311,
        "wires": [
            [
                "5d0976e3.85772",
                "41d3c085.28be38"
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
        "name": "Tri Evenements",
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
        "x": 233.5,
        "y": 142,
        "wires": [
            [
                "69ad2fb3.8b9708"
            ]
        ]
    },
    {
        "id": "e3c4761a.6b7f58",
        "type": "http request",
        "z": "66742219.78aae4",
        "name": "",
        "method": "GET",
        "ret": "obj",
        "url": "https://api.navitia.io/v1/coverage/fr-bre//places?q=\"Brequigny\"",
        "tls": "",
        "x": 595.5,
        "y": 118,
        "wires": [
            []
        ]
    },
    {
        "id": "5da9c255.05f13c",
        "type": "comment",
        "z": "66742219.78aae4",
        "name": "Calcul Dest",
        "info": "Le listing des destinations par l'API se fait \nà partir d'un point de départ géographique.\nCelui indiqué est l'Hotel de Ville.\n\nadmin_uri[]=admin:fr:35238 // commune de Rennes\ndisable_geojson=True // limite le débit",
        "x": 304.5,
        "y": 277,
        "wires": []
    },
    {
        "id": "40afa6d9.5994b",
        "type": "function",
        "z": "66742219.78aae4",
        "name": "Definition Start et Stop",
        "func": "msg.dest = {};\n\nmsg.dest = msg.payload.places[0].id;\n\nvar depart = global.get(\"emplacement\");\nmsg.start = {};\nmsg.start = depart;\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 183,
        "y": 354,
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
        "name": "Auth Header",
        "func": "\n// Définit le token d'appel Navitia\n// accessible à tous les nodes\nglobal.set(\"TokenNavitia\", \"dea0d6a8-7c09-40d7-b9a3-7c19f9f57ef7\");\n\nmsg.payload = 'on est partis !'\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 496,
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
        "y": 434,
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
    }
]
