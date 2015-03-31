// Constants
import Events from '../Events';
import {debug, translate as t} from '../Helpers';

// Global variables
import store from '../store';
import flux from '../flux/dispatcher';


// Props: account: Account
class AccountListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick() {
        flux.dispatch({
            type: Events.user.selected_account,
            accountId: this.props.account.id
        });
    }

    render() {
        var maybeActive = this.props.active ? "active" : "";
        return (
            <li className={maybeActive}>
                <span>
                    <a href="#" onClick={this.onClick.bind(this)}>{this.props.account.title}</a>
                </span>
            </li>
        );
    }
}


// State: accounts: [{id: accountId, title: accountTitle}]
export default class AccountListComponent extends React.Component {

    constructor() {
        this.state = {
            accounts: [],
            active: null
        };
    }

    listener() {
        this.setState({
            accounts: store.getCurrentBankAccounts(),
            active: store.getCurrentAccountId()
        });
    }

    componentDidMount() {
        store.on(Events.state.accounts, this.listener.bind(this));
    }

    componentWillUnmount() {
        store.removeListener(Events.state.accounts, this.listener.bind(this));
    }

    render() {
        var self = this;
        var accounts = this.state.accounts.map(function (a) {
            var active = self.state.active == a.id;
            return (
                <AccountListItem key={a.id} account={a} active={active} />
            );
        });

        return (
            <div className="sidebar-list">
                <ul className="sidebar-sublist"><span className="topic">{t('Accounts')}</span>
                    {accounts}
                </ul>
            </div>
        );
    }
}
