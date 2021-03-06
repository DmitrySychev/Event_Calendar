import React from 'react'
import { Card, Image, Button, Container, Popup, Label, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const timeoutLength = 2500

class CreatedEventCard extends React.Component{

  state = {
    event: '',
    attendees: [],
    isOpen: false,
    eventId: this.props.event.id
  }

  findJoinedEventsId = () => {
    const joinedEventsMap = this.props.joinedEvents.map(event => event.id)
    return joinedEventsMap.includes(this.props.event.id)
  }


  handleOpen = () => {
    this.setState({ isOpen: true })

    this.timeout = setTimeout(() => {
      this.setState({ isOpen: false })
    }, timeoutLength)
  }

  handleClose = () => {
    this.setState({ isOpen: false })
    clearTimeout(this.timeout)
  }

  componentDidMount() {
    fetch("/events/" + this.state.eventId)
    .then(resp => resp.json())
    .then(resp => {
      this.setState({attendees: resp.attendees})
    })
}


callDeleteUserEvent=(eventId)=>{
if(this.props.deleteUserEvent){
  this.props.deleteUserEvent(eventId)
}else{
  console.log("no props delete user event")
}}


  render(){
    return (
     
      <>
       <Popup
        trigger={
          <Card className="four wide column " style={{ margin: '1em' }} >
          <Image src={this.props.event.thumbnail} />
          <Card.Content>
            <Card.Header>{this.props.event.title}</Card.Header>
            <div id="date">Date: {this.props.event.date}</div>
            <Card.Description >
              {this.props.event.description}
            </Card.Description>
 
            <Container >

            <Container className="centered" style={{ margin: 'auto' }} >

                <Grid>
                  <Grid.Column textAlign="center">

              <Button size='small' onClick={()=> this.props.deleteEvent(this.props.event.id)} >Delete Event</Button>
              <Button style={{ marginTop: "1em"}} size='small' as={Link} to={'/events/' + this.props.event.id}   >Learn More</Button>
              
                  </Grid.Column>
                  </Grid>

              </Container>
            </Container>

          </Card.Content>
        </Card>
        }

        on='hover'
        onClose={this.handleClose}
        onOpen={this.handleOpen}
      >
        <Popup.Header>Attending</Popup.Header>
            <Popup.Content>
   
              <Label square color='teal' >
              {this.state.attendees.length}
              </Label> 
  
            </Popup.Content>
        </Popup>
        </>
     )}

  
  
  }
  



export default CreatedEventCard;