import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import * as Colors from 'material-ui/styles/colors';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';
import Searching from './Search';
import DisplayMovie from './Displaymovie.js';
import $ from 'jquery';
var obj;
export default class Home extends React.Component{
    
    constructor(props) {
    super(props);
    this.state = {drawer: false,searchBoxEnable:false,movieDetails:''};
  }
  
  handleToggle = () => this.setState({drawer: !this.state.drawer});
  handleSearch() {
        this.setState({searchBoxEnable:true});
        this.setState({drawer:false});
  }
  handleClose = () => this.setState({drawer: false});
  
  getFavourites(movie){
      alert(movie.moviename);
  }
  displayMovie(moviename){
    var movieObj=obj;
      $.ajax({
          url:'https://api.themoviedb.org/3/search/movie?api_key=a8654b92df1d2ce3b89bb66a01da07ff&language=en-US&query=' + moviename + '&page=1&include_adult=false',
          type:'get',
          success:function(data){
             var movie=data.results.map(movieresult =>{
                return (
                <DisplayMovie movie = {movieresult} getFavourites={movieObj.getFavourites.bind(movieObj)}/>
                ); 
              });
              movieObj.setState({movieDetails:movie})
              
              
          },
          error:function(err){
              console.log('error');
          }
      });
    }     
    render(){
        obj = this;
        var styles={
            heading:{
                textAlign:'center',
                textShadow:'1px 1px black',
                backgroundColor: Colors.lightBlue300
            },
            
            btncolor:{
                marginTop:'10px'
            }
        }
        
        return(
        <div>
            <AppBar title='PVR Cinemas' style={styles.heading} 
            iconElementRight={<Link to='/login'><RaisedButton style={styles.btncolor} label="LogOut" primary={true}/></Link>} 
            onLeftIconButtonTouchTap={this.handleToggle} />
            <Drawer
              docked={false}
              width={200}
              open={this.state.drawer}
              onRequestChange={(drawer) => this.setState({drawer})}>
              <MenuItem onTouchTap={this.handleSearch.bind(this)}>Search</MenuItem>
              <MenuItem onTouchTap={this.handleclose}>Display Favourites</MenuItem>
              <MenuItem onTouchTap={this.handleClose}>Add New Movies</MenuItem>
            </Drawer>
            {(this.state.searchBoxEnable) ? <Searching displayMovie={this.displayMovie.bind(this)}/> : ''}
            {this.state.movieDetails}
        </div> 
        );
    }
}