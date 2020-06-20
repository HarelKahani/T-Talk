import React from 'react';
import './welcome.css'
import App from './../App'

class FavoriteColorForm extends React.Component {
	state = { value: ''}

    newColor = e =>
     //   console.log("hi")
        // open.window(<App/>) 
		// document.getElementsByID("test").insert("{<App/>}")

	submit = e => {
	//	console.log(`New Color: ${this.state.value}`)
		e.preventDefault()
	}

	render() {
		return (
            <div id="frame">
                <div id="test">
                    <form onSubmit={this.submit}>
                        <label>
                            Favorite Color: 
                            <button
                                onChange={this.newColor} />
                        </label>
                        <button>Submit</button>
                    </form>
                    </div>
            </div> 
		)
	}
}


function MyApp() {
  return (
    <div className="shai">
            Hello World!    
    </div>
  );
}

export default MyApp;
export {FavoriteColorForm}
