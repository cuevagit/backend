
function controladorWebLogin(req, res) {
  
  if(req.session?.user)  
        return res.redirect('/formulario');
  else 
        res.render('login')
  }

 
 function controladorLogout(req, res) {
  res.render('logout', {usuario: req.session.user})
  req.session.destroy();
  }
   

function controladorLoging(req, res) {

    if(req.isAuthenticated) 
      res.json({username: req.session.user})
    else 
      return res.redirect("/")
    
}

function controladorLoginp(req, res) {
  
  req.session.user = req.body.username
 
  if(!req.isAuthenticated) { 
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


 function controladorIraRegistro(req, res) {
  res.render('registro')
 }

 function controladorIraLogin(req, res) {
  return res.redirect('/')
 }
 

 function controladorFailLogin(req, res) {
  res.render('faillogin')
 }

 
 function controladorFailRegister(req, res) {
   res.render('failregister')
  }


  
  
export { controladorWebLogin, controladorLoging, controladorLoginp, controladorLogout, controladorVolveralogin, controladorIraRegistro, controladorIraLogin, controladorFailLogin, controladorFailRegister }
