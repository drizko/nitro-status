import { Component } from "preact";
import firebase from "firebase/app";
import config from "./config.js";
import "firebase/database";
import "./style";

const firebaseConfig = {
	apiKey: config.apiKey,
	authDomain: config.authDomain,
	databaseURL: config.databaseURL,
	projectId: config.projectId
};

firebase.initializeApp(firebaseConfig);

export default class App extends Component {
	state = {
		full: true
	};

	updateStatus = () => {
		console.log(!this.state.full);
		firebase
			.database()
			.ref("status")
			.set(!this.state.full);
	};

	componentDidMount() {
		firebase
			.database()
			.ref("status")
			.on("value", data => {
				this.setState({ full: data.val() });
			});
	}

	render() {
		return (
			<div class="container">
				<div>Nitro Cold Brew Status</div>
				<div>
					{this.state.full ? (
						<img src="../assets/good.png" />
					) : (
						<img src="../assets/bad.png" />
					)}
				</div>
				<button onClick={this.updateStatus}>Update Status</button>
			</div>
		);
	}
}
