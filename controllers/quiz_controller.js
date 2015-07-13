// GET /quizes/question
export.question = function(req, res) {
  res.render('quizes/question', {pregunta: ' Capital de Italiza'});
};

// GET /quizes/answer
exports.answer = function(req, res) {
  if (req.query.respuesta === 'Roma'){
    res.render('quizes/answer', {respuesta: 'Correcto'});
  } else {
    res.render('quizes/answer', {respuesta: 'Incorrecto'});
  }
};
