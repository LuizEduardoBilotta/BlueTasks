import React, { Component } from 'react';
import AuthService from '../api/AuthService';
import { APP_NAME } from '../constants';
import NavBarItem from './NavBarItem';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                { name: "Listar Tarefas", href: "/", active: true },
                { name: "Nova Tarefa", href: "/form", active: false },
            ]
        }

        this.onClickHandler = this.onClickHandler.bind(this);
        this.onLogoutHandler = this.onLogoutHandler.bind(this);
    }

    onClickHandler(itemClicked) {
        const items = [...this.state.items]

        items.forEach(item => {
            if (item.name === itemClicked.name) {
                item.active = true;
            } else {
                item.active = false;
            }
        })

        this.setState({ items });
    }

    onLogoutHandler() {
        AuthService.logout();
        this.props.onLinkClick();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">{APP_NAME}</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            {this.state.items.map(
                                item => <NavBarItem
                                    key={item.name}
                                    item={item}
                                    onClick={this.onClickHandler}
                                />
                            )}
                            { AuthService.isAuthenticated() ? 
                                <NavBarItem item={ {  name: "Logout", active: false, href: "#" } } onClick={this.onLogoutHandler} />
                                : ""
                            }
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;