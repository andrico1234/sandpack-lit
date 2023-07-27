const express = require('express');
const { create } = require('express-handlebars');

const app = express();
const port = 3000;

const hbs = create({
  helpers: {
    isEq(val, val2) { return val === val2 },
  }
});

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', {
    route: 'home'
  });
});

app.get('/albums', (req, res) => {
  res.render('albums', {
    route: 'albums'
  });
});

app.get('/top-40', (req, res) => {
  res.render('top-40', {
    route: 'top-40'
  });
});

app.listen(port, () => console.log(`App listening to port ${port}`));