import React from 'react';

// Components
import Button from "src/components/Menu/Button";
import Search from "src/components/Menu/SearchBar";
import Avatar from "src/components/Avatar";

export default props => (
  <header className="menu row">
    <img src="frontend/public/assets/images/logo.png" />

    <Button>
      <i className="fab fa-trello"></i>
      <span>Boards</span>
    </Button>

    <Search />

    <div style={{marginLeft: "auto"}}>
      <Button>
        <i className="fas fa-plus no-margin"></i>
      </Button>

      <Button>
        <i className="fas fa-info-circle no-margin"></i>
      </Button>

      <Button>
        <i className="fas fa-bell no-margin"></i>
      </Button>

      <Avatar />
    </div>
  </header>
);
