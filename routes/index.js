const { Router } = require('express');
const bodyParser = require('body-parser');

const connection = require('./conf');

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

/* GET index page. */
router.get('/companion', (req, res) => {
  connection.query('SELECT * from companion', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des compagnons');
    } else {
      res.json(results);
    }
  });
});

router.get('/companions/names', (req, res) => {
  connection.query('SELECT name from companion', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des compagnons');
    } else {
      res.json(results);
    }
  });
});

router.get('/companions/name', (req, res) => {
  if (req.query.contain) {
    const { contain } = req.query;
    connection.query(`SELECT name from companion where name like'%${contain}%'`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des compagnons');
      } else {
        res.json(results);
      }
    });
  } else if (req.query.start) {
    const { start } = req.query;
    connection.query(`SELECT name from companion where name like'${start}%'`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des compagnons');
      } else {
        res.json(results);
      }
    });
  } else if (req.query.dat) {
    const { dat } = req.query;
    connection.query(`SELECT name from companion where first_app >'${dat}'`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des compagnons');
      } else {
        res.json(results);
      }
    });
  } else if (req.query.order) {
    const { order } = { ...req.query };
    connection.query(`SELECT name from companion order by name ${order}`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des compagnons');
      } else {
        res.json(results);
      }
    });
  }
});

router.post('/companions', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO companion SET ?', formData, (err, results) => {
    console.log(err);
    if (err) {
      res.status(500).send("Erreur lors de la sauvegarde d'un employé");
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/companion/:id', (req, res) =>{
  const idEmployee = req.params.id;
  const formData = req.body;
  connection.query('UPDATE companion SET ? WHERE id = ?', [formData, idEmployee], (err) => {
    if (err) {
      res.status(500).send("Erreur lors de la modification d'un employé");
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/companion/life/:id', (req, res) =>{
  const idEmployee = req.params.id;
  connection.query(`UPDATE companion SET alive = !alive WHERE id = ${idEmployee}`, (err) => {
    if (err) {
      res.status(500).send("Erreur lors de la modification d'un employé");
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/companion/:id', (req, res) => {
  const idEmployee = req.params.id;
  connection.query('DELETE FROM companion WHERE id = ?', [idEmployee], (err) => {
    if (err) {
      res.status(500).send("Erreur lors de la suppression d'un employé");
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/companions/dead', (req, res) => {
  connection.query('DELETE FROM companion WHERE alive = false', (err) => {
    if (err) {
      res.status(500).send("Erreur lors de la suppression d'un employé");
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
