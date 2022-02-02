import './bootstrap';
import * as cardCreatePage from './pages/card_create';
import * as cardListPage from './pages/card_list';

if (cardCreatePage.detect()) {
    cardCreatePage.initialize();
}

if (cardListPage.detect()) {
    cardListPage.initialize();
}
