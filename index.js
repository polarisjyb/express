import express from 'express';
import maria from 'mysql';

const app = express();

// maria DB 연결
const connection = maria.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'root',
  database: 'aitrading_db'
});

// express 포트 설정
app.set('port', process.env.PORT || 3300);

// 메인 페이지
app.get('/', (req, res) => {
  // console.log(req);
  res.send('3300번 포트로 가동된 루트 페이지 입니다.');
});

// /maria 페이지
app.get('/maria', (req, res) => {
  // SELECT * from 테이블
  // COMPANYLIST 테이블의 데이터를 최대 20개 까지 읽기
  connection.query('SELECT * FROM COMPANYLIST LIMIT 20', (err, result, field) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
    // 쿼리 중에 오류가 발생하면 error가 됩니다.
    // result에는 쿼리 결과가 포함됩니다.
    // field에는 반환된 result(있는 경우)에 대한 정보가 포함됩니다.
  });
});

// listening
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
}); 