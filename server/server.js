var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect('mongodb://victordc:2679970v@ds139262.mlab.com:39262/recetario');


var Recipes = mongoose.model( 'Recipes',{
    name: String,
    description: String,
    imagePath: String,
    ingredients: Array,
    procedure: String
});
var Ingredients = mongoose.model( 'Ingredients',{
    name: String,
    medida: String
});

 app.configure( function(){
    app.use( express.static(__dirname + '/publico') );
    app.use( express.bodyParser() );
    app.use( express.methodOverride() );
 })

 app.use( cors() );
 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


 app.post('/api/recipes' , function(peticion, respuesta){
     Recipes.create({
         name : peticion.body.name,
         description : peticion.body.description,
         imagePath : peticion.body.imagePath,
         ingredients : peticion.body.ingredients,
         procedure : peticion.body.procedure
        } , function(err,recipes){
            if(err){
                respuesta.send(err);
            }

            Recipes.find( function(err, recipes){
                if(err){
                    respuesta.send(err);
                }

                respuesta.json(recipes);

            })
    })
 })

 app.get( '/api/recipes' , function(peticion, respuesta){
    Recipes.find( function(err,recipes){
        if(err){
            respuesta.send(err);
        }

        respuesta.json(recipes);
    })
 })

 app.delete( '/api/recipes/:item' , function(peticion, respuesta){
    Recipes.remove( {
        _id : peticion.params.item
    } ,function(err,recipes){
        if(err){
            respuesta.send(err);
        }

        Recipes.find( function(err, recipes){
            if(err){
                respuesta.send(err);
            }

            respuesta.json(recipes);

        })
    })
 })

 app.put( '/api/recipes/:item' , function(peticion, respuesta){
    Recipes.findOneAndUpdate( 
        { _id : peticion.params.item },
        {   name : peticion.body.name,
            description : peticion.body.description,
            imagePath : peticion.body.imagePath,
            ingredients : peticion.body.ingredients,
            procedure : peticion.body.procedure
        },
        function(err,recipes){
            if(err){
                respuesta.send(err);
            }

            Recipes.find( function(err, recipes){
                if(err){
                    respuesta.send(err);
                }

                respuesta.json(recipes);

            })
        })
 } )




 app.post('/api/ingredients' , function(peticion, respuesta){
    Ingredients.create({
        name : peticion.body.name,
        medida : peticion.body.medida
    } , function(err,ingredients){
           if(err){
               respuesta.send(err);
           }

           Ingredients.find( function(err, ingredients){
               if(err){
                   respuesta.send(err);
               }

               respuesta.json(ingredients);

           })
   })
})

app.get('/api/ingredients' , function(peticion, respuesta){
    Ingredients.find( function(err, ingredients){
        if(err){
            respuesta.send(err);
        }

        respuesta.json(ingredients);

    })
})

app.delete( '/api/ingredients/:item' , function(peticion, respuesta){
    Ingredients.remove( {
       _id : peticion.params.item
   } ,function(err,ingredients){
       if(err){
           respuesta.send(err);
       }

       Ingredients.find( function(err, ingredients){
           if(err){
               respuesta.send(err);
           }

           respuesta.json(ingredients);

       })
   })
})

app.put( '/api/ingredients/:item' , function(peticion, respuesta){
    Ingredients.findOneAndUpdate(
       { _id : peticion.params.item },
       {    name : peticion.body.name,
        },
       function(err,ingredients){
           if(err){
               respuesta.send(err);
           }

           Ingredients.find( function(err, ingredients){
               if(err){
                   respuesta.send(err);
               }

               respuesta.json(ingredients);

           })
       })
})


app.get( '*', function( request, recursos){
    recursos.sendfile( './publico/index.html')
 })

app.listen( process.env.PORT || 8080 , function(){
    console.log("el servidor funciona correctamente");
} )