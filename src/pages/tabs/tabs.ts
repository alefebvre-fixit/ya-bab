import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { GroupListPage } from '../groups';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = GroupListPage;
  tab3Root = 'UserListPage';
  tab4Root = ContactPage;
  

  constructor() {

  }
}
