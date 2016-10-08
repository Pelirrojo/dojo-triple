# Cypher Ninja Queries


## Populate the Ninja Team

````cypher
    CREATE (NinjaTeam:Clan {name:'The Ninja Project Team', released:2016, tagline:'Welcome to the Real World'})
    CREATE (Rai:Ninja {name:'Raimundo Alegría', role:'Product Owner'})
    CREATE (MartaL:Ninja {name:'Marta López', role:'Product Owner'})
    CREATE (David:Ninja {name:'David Hernantes', role:'Product Owner'})
    CREATE (Jacobo:Ninja {name:'Jacobo Sánchez', role:'Gamification'})
    CREATE (MartaS:Ninja {name:'Marta Salas', role:'UX'})
    CREATE (Xandra:Ninja {name:'Xandra Serrano', role:'Communication'})
    CREATE (Susana:Ninja {name:'Susana Ramos', role:'Events'})
    CREATE (Javi:Ninja {name:'Javier Navarrete', role:'Artist'})
    CREATE (Stef:Ninja {name:'Estefanía García', role:'Dev'})
    CREATE (Joseph:Ninja {name:'José Luis Fernández', role:'Dev'})
    CREATE (Manu:Ninja {name:'Manuel E. de Paz', role:'Dev'})
    
    CREATE
        (Rai)-[:IS_MEMBER]->(NinjaTeam),
        (MartaL)-[:IS_MEMBER]->(NinjaTeam),
        (David)-[:IS_MEMBER]->(NinjaTeam),
        (Jacobo)-[:IS_MEMBER]->(NinjaTeam),
        (MartaS)-[:IS_MEMBER]->(NinjaTeam),
        (Xandra)-[:IS_MEMBER]->(NinjaTeam),
        (Susana)-[:IS_MEMBER]->(NinjaTeam),
        (Javi)-[:IS_MEMBER]->(NinjaTeam),
        (Stef)-[:IS_MEMBER]->(NinjaTeam),
        (Joseph)-[:IS_MEMBER]->(NinjaTeam),
        (Manu)-[:IS_MEMBER]->(NinjaTeam)
    
````

## Get Some Ninjas

````cypher
    MATCH (n:Ninja) RETURN n LIMIT 25
````

## Save a ninja
## Save a ninja