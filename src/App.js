import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import Keresidezet from "./sajatosztalyok/Keresesidezet"
import Velemeny from "./sajatosztalyok/Velemeny"
import Kezdolap from "./sajatosztalyok/Welcome"
import Torles from "./sajatosztalyok/Torles"
import Felvitel from "./sajatosztalyok/Felvitel"
import Statisztika from "./sajatosztalyok/Statisztika"
import Torlesvelemeny from "./sajatosztalyok/Torlesvelemeny"

class App extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      
      <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        
        Mit Üzen Neked?
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        
          <div className="navbar-nav mr-auto">
            
            <li className="nav-item">
              <Link to={"/Kezdolap"} className="nav-link">
                Kezdőlap
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Keresesidezet"} className="nav-link">
                Keresés
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Velemeny"} className="nav-link">
                Vélemény
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Felvitel"} className="nav-link">
                Felvitel
              </Link>
            </li>
            

            

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torles"} className="nav-link">
                  Admin Idézet Törlés
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torlesvelemeny"} className="nav-link">
                  Admin Vélemény Törlés
                </Link>
              </li>
            )}
            <li className="nav-item">
                <Link to={"/Statisztika"} className="nav-link">
               Statisztika
                </Link>
              </li>

            
          </div>
      
        </Nav>
        <Nav>
        {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>

        
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/Torles" component={Torles} />
            <Route path="/Torlesvelemeny" component={Torlesvelemeny} />
            <Route path="/Statisztika" component={Statisztika} />
            <Route path="/Keresesidezet" component={Keresidezet} />
            <Route path="/Kezdolap" component={Kezdolap} />
            <Route path="/Velemeny" component={Velemeny} />
            <Route path="/Felvitel" component={Felvitel} />
        
        
        


          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
