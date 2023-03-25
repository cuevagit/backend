 
 function controladorLoginp(req, res) {
  
  req.session.user = req.body.username
 
  if(!req.isAuthenticated) { 
      return res.status(401)
  } else {
     res.status(200).json({"usuario": req.session.user })
  }
  
}


 function controladorLogout(req, res) {
   req.session.destroy();
 }


 async function controladorRegistro(req, res) {
  res.status(201);
  const objeto = req.body; 

  res.json(objeto)

 }   

  
export { controladorLoginp, controladorLogout, controladorRegistro }
