import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import * as Colors from 'material-ui/styles/colors';
import {Card,MuiThemeProvider,CardMedia,CardText,CardHeader,CardActions} from 'material-ui';
import {Row,Col} from 'react-flexbox-grid';

export default class DisplayMovie extends React.Component{
    
    constructor(props) {
    super(props);
    this.state = {showTitle:false,showAction:false,moviename:this.props.movie.title,poster:this.props.movie.poster_path,date:this.props.movie.release_date,details:false};
  }
    
    onHover(){
        this.setState({showTitle: !this.state.showTitle});
        this.setState({showAction: !this.state.showAction});
    }
    onmouseout()
    {
        this.setState({showTitle : false});
  
    }
    
    addfavourites(){
        this.props.getFavourites({moviename:this.state.moviename,poster:this.state.poster,date:this.state.date});
    }
    
    viewDetails(){
        this.setState({details:true});
    }
    
    handleClose(){
        this.setState({details:false});
    }
 render(){
     var styles={
         imgsize:{
             backgroundColor:Colors.blue500,
             position:'relative',
             margin:'auto',
             top:'250px',
        
       },
       imgalign:{
           paddingTop:'10px'
       },
       
       colorchange:{
           color:Colors.red600
       },
       
       carddialog:{
           backgroundColor:Colors.deepPurple200
       },
       
       dialog:{
           backgroundColor:Colors.deepPurple700
       }
     }
     
     const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />
  ]

     return(
        <div>
            <MuiThemeProvider>
            <Row center = 'xs'>
            <Col xs = {6}>
                <Card style = {styles.imgsize} onMouseOver={this.onHover.bind(this)} onMouseOut = {this.onmouseout.bind(this)} >
                    {this.state.showTitle ? <CardHeader open={this.state.showTitle}  title={this.props.movie.title}/> : ''}
                    <CardMedia style={styles.imgalign}>
                      <img src={'http://image.tmdb.org/t/p/w185/'+this.props.movie.poster_path} alt="" />
                    </CardMedia>
                    <CardActions>
                      <RaisedButton label="AddFavourites" onTouchTap={this.addfavourites.bind(this)} primary={true} />
                      <RaisedButton label="Details" onTouchTap={this.viewDetails.bind(this)} primary={true} /> 
                    </CardActions>
                </Card>
                <Dialog style={styles.dialog}
                  title="Brief Details"
                  actions={actions}
                  modal={true}
                  open={this.state.details}
                >
                  <CardText style={styles.carddialog}>
                    <b style={styles.colorchange}>MovieName</b> : {this.props.movie.title}<br />
                    <b style={styles.colorchange}>ReleaseDate</b> : {this.props.movie.release_date}<br/>
                    <b style={styles.colorchange}>Popularity</b> : {this.props.movie.popularity}<br/>
                    <b style={styles.colorchange}>OverviewDetails</b> : {this.props.movie.overview}
                  </CardText>
                </Dialog>
                
                </Col>
                </Row>
            </MuiThemeProvider>
        </div>
     );
 }   
}