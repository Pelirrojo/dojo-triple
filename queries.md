# Cypher Ninja Queries


## Populate the Ninja Team

````cypher
    CREATE (NinjaTeam:Clan {shortCode:'NinjaTeam', name:'The Ninja Project Team', released:2016, slogan:'El proyecto ninjas de BBVA se ha creado para detectar, visibilizar, fomentar y valorar el talento de nuestro equipo. Bueno, para eso y para dominar el mundo, claro.'})
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

## Get Some Ninjas or Clans

````cypher
    MATCH (n:Ninja) RETURN n LIMIT 25
    
    MATCH (c:Clan)-[*1]-(n) RETURN c,n
    query: MATCH (c:Clan)-[rel:IS_MEMBER]-(a) RETURN c,rel,a
    parameters: 
````

## Save a ninja
## Save a ninja