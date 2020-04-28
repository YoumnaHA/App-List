import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class UpdataMailForm extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="h2">
                    <h2>Paramètres</h2>
                </div>

                <div className="h3">
                    <h3>Adresse e-mail</h3>
                </div>

                <div className="h6">
                    <h6>Adresse e-mail</h6>
                </div>

                <form>
                    <label>
                        Nouvelle adresse e-mail
                    </label>
                    <input
                        type="text"
                        name="mail1"
                        placeholder="mail@provider.com"
                        required="true">
                    </input>

                    <label>
                        Confirmer l'adresse e-mail
                    </label>
                    <input
                        type="text"
                        name="mail2"
                        placeholder="mail@provider.com"
                        required="true">
                    </input>
                    <input
                        type="submit"
                        value="Modifier l'adresse e-mail">
                    </input>
                </form>
            </React.Fragment>

        );
    }
}

ReactDOM.render(<UpdataMailForm />, document.getElementById('root'));