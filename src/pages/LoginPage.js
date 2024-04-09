import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Delayer from "../components/delayer";
import { Login } from "../network/Login";

import { TestFunction } from "../network/TestFunction";
import API from "../network/API";
import Cookies from "universal-cookie";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onClick = async (event) => {
    event.preventDefault();
    // const good =
    // await Login(email, password);
    let success = await API.login({
      login: email,
      password: password,
    });
    if (success) {
      navigate("/user/me");
    }
    // if(good) {
    //     alert("Вход выполнен");
    // } else {
    //     alert("Ошибка при входе в систему");
    // }
  };

  // function logout() {
  //   API.logout();
  // }

  return (
    <>
      {/* <Delayer /> */}
      <Card style={{ width: "25rem" }}>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={onClick}>
              Войти
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {/* <Link to="/">Назад</Link> */}
      {/* <Button onClick={TestFunction}>Test</Button> */}
      {/* <Button onClick={logout}>Выйти</Button> */}
    </>
  );
}

export default LoginPage;
