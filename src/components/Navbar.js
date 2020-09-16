import React, { Component } from 'react';
import { APP_NAME } from '../constants';
import NavBarItem from './NavBarItem';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                { name: "Listar Tarefas", href: "/" },
                { name: "Nova Tarefa", href: "/form" },
            ]
        }
    }

    onClickHandler(item) {
        alert(item.name);
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
                                    item={item}
                                    onClick={this.onClickHandler}
                                />
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;