function controladorWebLogin(req, res) {
   
    if(req.session?.user) { 
        return res.redirect('/formulario');
      } else {
         res.render('login')
      }
 }

 
 function controladorLogout(req, res) {
    res.render('logout', {usuario: req.session.user})
    req.session.destroy();
   }
   

function controladorLoging(req, res) {

    if(req.session.user) { 
      res.json({usuario: req.session.user})
    }
    else
     return res.redirect("/")
    
}

function controladorLoginp(req, res) {
    
  req.session.user = req.body.usuario
  
  if(!req.session.user) { 
      return res.redirect('/')
  } else {
      return res.redirect('/formulario')
  }
  
}


function controladorVolveralogin(req, res) {
  setTimeout(() => {
   return res.redirect('/')
   }, 2000);
 }


export { controladorWebLogin, controladorLoging, controladorLoginp, controladorLogout, controladorVolveralogin }
