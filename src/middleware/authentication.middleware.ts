export async function ensureAuthenticated(req: any, res: any, next:any) {
    //TODO Implemnt cookie parser
    if (req.isAuthenticated()) {
      // If user is authenticated, allow them to proceed
      return next();
    } else {
      // If user is not authenticated, redirect to login page or show an error
      return res.redirect('/'); // Modify the URL according to your application's routes
    }
  }
