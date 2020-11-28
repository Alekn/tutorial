import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const api = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return (
            <tr>
                <th colSpan='2'>
                    {category}
                </th>
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ?
            product.name :
            <span style={{color: 'red'}}>
                {product.name}
            </span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const rows = [];
        let lastCategory = null;

        this.props.products.forEach((product) => {
            if (product.name.indexOf(filterText) === -1) {
                return;
            }
            if (inStockOnly && !product.stocked) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category}
                    />
                );
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name}
                />
            );
            lastCategory = product.category;
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    handleFilterTextChange = (e) => {
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange = (e) => {
        this.props.onInStockChange(e.target.checked);
    }
    
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..." 
                    value={filterText}
                    onChange={this.handleFilterTextChange}
                />
                <p>
                    <input 
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={this.handleInStockChange}
                    />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false,
        };
    }

    handleFilterTextChange = (filterText) => {
        this.setState({
            filterText
        });
    }

    handleInStockChange = (inStockOnly) => {
        this.setState({
            inStockOnly
        });
    }

    render() {
        return (
            <div>
                <SearchBar 
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockChange={this.handleInStockChange}
                />
                <ProductTable
                    products={this.props.products} 
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <FilterableProductTable products={api} />,
    document.querySelector('#root')
);

/* function toCelcius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celcius) {
    return (celcius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

const scaleNames = {
    c: 'Celcius',
    f: 'Fahrenheit',
}

class TemperatureInput extends React.Component {
    handleChange = (e) => {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>
                    Enter temperature in {scaleNames[scale]}:
                </legend>
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        );
    }
}


function BoilingVeredict(props) {
    if (props.celcius >= 100) {
        return <p>The water would boild.</p>;
    }
    return <p>The water would not boild.</p>;
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: '',
            scale: 'c',
        };
    }

    handleCelciusChange = (temperature) => {
        this.setState({
            scale: 'c',
            temperature
        });
    }

    handleFahrenheitChange = (temperature) => {
        this.setState({
            scale: 'f',
            temperature
        });
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celcius = scale === 'f' ? tryConvert(temperature, toCelcius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput 
                    scale='c'
                    temperature={celcius}
                    onTemperatureChange={this.handleCelciusChange}
                />
                <TemperatureInput 
                    scale='f' 
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}
                />                
                <BoilingVeredict celcius={parseFloat(celcius)} />
            </div>
        );
    }
}

ReactDOM.render(
    <Calculator />,
    document.querySelector('#root')
)
 */

/* class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2,
        };
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form>
                <label>
                    Is going:
                    <input
                        name='isGoing'
                        type='checkbox'
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br/>
                <label>
                    Number of guests:
                    <input
                        name='numberOfGuests'
                        type='number'
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange}
                    />
                </label>
            </form>
        );
    }
}

ReactDOM.render(
    <Reservation />,
    document.querySelector('#root')
) */

/* class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'coco'};
    }

    handleChange = (e) => {
        this.setState(
            {value: e.target.value}
        );
    }

    handleSubmit = (e) => {
        alert('Tu sabor favorito es: ' + this.state.value);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Selecciona tu sabor favorito:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="uva">Uva</option>
                        <option value="lima">Lima</option>
                        <option value="coco">Coco</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

ReactDOM.render(
    <FlavorForm />,
    document.querySelector('#root')
) */

/* class EssayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Por favor escriba un ensayo sobre su elemento del DOM favorito.'
        };
    }

    handleChange = (e) => {
        this.setState(
            {value: e.target.value}
        );
    }

    handleSubmit = (e) => {
        alert('Un ensayo fue enviado: ' + this.state.value);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Ensayo:
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

ReactDOM.render(
    <EssayForm />,
    document.querySelector('#root')
) */



/* class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    handleChange = (e) => {
        this.setState(
            {value: e.target.value.toUpperCase()}
        );
    }

    handleSubmit = (e) => {
        alert('A name was submited: ' + this.state.value);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

ReactDOM.render(
    <NameForm />,
    document.querySelector('#root')
) */

/* function Blog(props) {
    const sidebar = (
        <ul>
            {props.posts.map((post) =>
                <li key={post.id}>
                    {post.title}
                </li>
            )}
        </ul>
    );

    const content = props.posts.map((post) =>
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );

    return (
        <div>
            <ul>
                {props.posts.map((post) => 
                    <li key={post.id}>
                        {post.title}
                    </li>    
                )}
            </ul>
            <hr/>
            {content}
        </div>
    );
}

const posts = [
    {id: 1, title: 'Hola mundo', content: 'Bienvenido a aprender React!'},
    {id: 2, title: 'Instalación', content: 'Puedes instalar React desde npm.'},
];

ReactDOM.render(
    <Blog posts={posts} />,
    document.querySelector('#root')
); */


/* function ListItem(props) {
    return <li>{props.value}</li>;
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => 
        <ListItem key={number.toString()} value={number} />
    );

    return (
        <ul>{listItems}</ul>
    );
}

ReactDOM.render(
    <NumberList numbers={[1, 2, 3, 4, 5]} />,
    document.querySelector('#root')
) */


/* function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }

    return(
        <div className='warning'>
            Cuidado!
        </div>
    );
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWarning: true};
    }

    handleToggleClick = () => {
        this.setState(
            state => ({showWarning: !state.showWarning})
        );
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <Page />,
    document.querySelector('#root')
); */


 
/* function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sing up.</h1>
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

function LoginButton(props) {
    return(
        <button onClick={props.onClick}>
            Login
        </button>
    );
}

function LogoutButton(props) {
    return(
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
    }

    handleLoginClick = () => {
        this.setState(
            () => ({isLoggedIn: true})
        );
    }

    handleLogoutClick = () => {
        this.setState(
            () => ({isLoggedIn: false})
        );
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;

        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />
        }

        return(
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

ReactDOM.render(
    <LoginControl />,
    document.querySelector('#root')
);
 */

/* function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sing up.</h1>
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        // this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.setState(
            state => ({isToggleOn: !state.isToggleOn})
        );
    }
    // handleClick() {
    //     this.setState(
    //         state => ({isToggleOn: !state.isToggleOn})
    //     );
    // }

    render() {
        return(
            <div>
                <Greeting isLoggedIn={this.state.isToggleOn} />
                <button onClick={this.handleClick}>
                    {this.state.isToggleOn ? 'Off' : 'On'}
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <Toggle />,
    document.querySelector('#root')
); */

/* class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div>
                <h1>Hola, Mundo!</h1>
                <h2>Son las {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock />,
    document.querySelector('#root')
); */


/* class Welcome extends React.Component {
    render() {
        return <h1>Hola desde la clase, {this.props.name}</h1>
    }
}

function Bienvenido(props) {
    return <h1>Hello desde la función, {props.name}</h1>
}

function tick() {
    const element = (
        <div>
            <h1>
                Hola, Mundo!
            </h1>
            <h2>
                Son las {new Date().toLocaleTimeString()}.
            </h2>
        </div>
    );
    ReactDOM.render(
        [element, <Bienvenido name='Alek' />, <Welcome name='Alex'/>],
        document.getElementById('root')
    );
}

setInterval(tick, 1000); */

/* function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}
const user = {
    firstName: 'Alex',
    lastName: 'Munera',
};

const name = 'Alek';

const element = <h1>Hola, Mundo! Soy {formatName(user)}, conocido como {name}</h1>;

ReactDOM.render(
        element
        , document.getElementById('root')
); */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
