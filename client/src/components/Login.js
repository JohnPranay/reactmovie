import React from 'react';
import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {lightBlue100,lightBlue400} from 'material-ui/styles/colors';
import {Grid,Row,Col} from 'react-flexbox-grid';

/*form field component */
export default class Login extends React.Component {
  constructor() {
    super();
   this.state = {
       name :'',
       password:''
   };
    }
    
     onChangeName(e) {
        this.setState({name: e.target.value});
    }
    
     onChangePassword(e) {
        this.setState({password: e.target.value});
    }
    
    /* rendering method */
    render(){
        /*stylesheet for Paper component */
        const styles = {
            paper: {
                    width: '70%',
                    height: '400px',
                    margin: '70px 140px',
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor:lightBlue100
            },

            header: {
                     textShadow:'1px 1px black',
                     color:lightBlue400
            }
        };
        return(
                <MuiThemeProvider>
                  <div>
                  <Grid>
                     <Row>
                        <Col lg={12} md={12} sm={12} xs={8}>
                            <Paper style={styles.paper}>
                                <h1 style={styles.header}>PVR Cinemas</h1>
                                <TextField value={this.state.name} onChange={this.onChangeName.bind(this)} 
                                  hintText="username"
                                  floatingLabelText="UserName" /><br />
                                <TextField value={this.state.password} onChange={this.onChangePassword.bind(this)}
                                  hintText="password"
                                  floatingLabelText="Password" /><br />
                               <Link to="/home"><RaisedButton label="Login" primary={true} /></Link>
                            </Paper>
                        </Col>
                    </Row>
                </Grid>
                  </div>
                </MuiThemeProvider>
       );
    }
  }