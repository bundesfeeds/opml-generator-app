import React, { Component } from 'react';
import './App.css';

const tStyle = {
  display: 'block',
  fontSize: '20px',
  textAlign: 'left'
};

const defaultFeeds  = `https://www.heise.de/rss/heise-atom.xml

https://www.heise.de/autos/rss/news-atom.xml
`;
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        value: defaultFeeds,
    }
  }
  handleChange(event) {
    this.setState({value: event.target.value})
  }  
  noOp() {}

  renderOpml() {


    const rows = this.state.value.split(/\r|\n/);
    const filtered = rows
      .filter(row => row.match(/\S/))
      .map(row => {
        const url = new URL(row);
        return url
      })
      .map(row => new URL(row))
  
    return `<?xml version="1.0" encoding="UTF-8"?>
<opml version="1.0">
    <head>
        <title>Simple OPML Generator</title>
    </head>
    <body>
      <h1>Simple OPML Generator</h1>
      <outline title="Feeds" text="Feeds">
        ${filtered.map(item => `<outline type="rss" text="${item}" xmlUrl="${item}"/>`).join('\n')}
      </outline>
    </body>
</opml>
    `;
  }

  render() {
    return (

      <div className="App">
      <h1>Simple OPML Generator</h1>
       <textarea value={this.state.value} rows="10" cols="80" style={tStyle} onChange={this.handleChange.bind(this)} onBlur={this.handleChange.bind(this)}></textarea>
        <textarea value={this.renderOpml()} rows="10" cols="80" onChange={this.noOp} style={tStyle} ></textarea>
      </div>
    );
  }
}

export default App;
