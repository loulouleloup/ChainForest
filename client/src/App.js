import React, { Component } from "react";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';


import IcoContract from "./contracts/Ico.json";
import ProjectsContract from "./contracts/Projects.json";

import getWeb3 from "./getWeb3";

import "./App.css";





class App extends Component {
  //Mettre tout les states de l'app en généralz
  state = { web3: null, accounts: null, contract: null, isOwner: false, isRegister: false, whitelistArray: null, contractWorkflowStatus: 0, proposalArray: null, accountBalance: 0, workflowStatusDescription: null, winningProposalId: 0 };
  //Sortir certaines var du state et faire des var global?

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = IcoContract.networks[networkId];
      const contract = new web3.eth.Contract(
        IcoContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      /*const deployedNetwork2 = ProjectsContract.networks[networkId];
      const contract2 = new web3.eth.Contract(
        ProjectsContract.abi,
        deployedNetwork2 && deployedNetwork2.address,
      );

        */
        /*
      const contractWorkflowStatus = await contract.methods.getWorkflowStatus().call();
      //contractWorkflowStatus = parseInt(contractWorkflowStatus);
      let tmp_wf = contractWorkflowStatus;
      let workflowStatusDescription = "";
      let nextWorkflow = "";


      switch (tmp_wf.toString()) {
        case '0':
          workflowStatusDescription = "Registering Voters";
          nextWorkflow = "Proposals Registration Started";
          break;
        case '1':
          workflowStatusDescription = "Proposals Registration Started";
          nextWorkflow = "Proposals Registration Ended";
          break;
        case '2':
          workflowStatusDescription = "Proposals Registration Ended";
          nextWorkflow = "Voting Session Started";
          break;
        default:
          workflowStatusDescription = "Unknown Status";
      }*/

      //let whitelistArray = await contract.methods.getWhitelist().call();
      //if (contractWorkflowStatus >= 1) {
     /*   let proposalArray = await contract2.methods.getProject().call();
        this.setState({ proposalArray });
        console.log(proposalArray); */
      //}

      /*if (contractWorkflowStatus == 5) {
        const winningProposalId = await contract.methods.winningProposalId().call();
        this.setState({ winningProposalId });
        console.log('winningProposalId', winningProposalId);
      }*/


      let accountBalance = await web3.eth.getBalance(accounts[0]);
      this.state.contractOwner = await contract.methods.owner().call();

      if (this.state.contractOwner === accounts[0]) {
        this.setState({ isOwner: true });
      }


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
     // this.setState({ web3, accounts, contract, whitelistArray, accountBalance, workflowStatusDescription, contractWorkflowStatus, nextWorkflow });
     this.setState({ web3, accounts, contract, accountBalance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  
 /* nextWorkflow = async () => {
    const { accounts, contract, web3 } = this.state;
    const context = this;
    switch (parseInt(this.state.contractWorkflowStatus)) {
      case 0:
        await contract.methods.startProposalsRegistration().send({ from: accounts[0], gasPrice: 100000 }, this.getWorkflowStatus);
        break;
      case 1:
        await contract.methods.endProposalsRegistration().send({ from: accounts[0], gasPrice: 100000 }, this.getWorkflowStatus);
        break;
      case 2:
        await contract.methods.startVotingSession().send({ from: accounts[0], gasPrice: 100000 }, this.getWorkflowStatus);
        break;
     
     
      case 3:
        console.log('Contrat arrivé à échéance')
    }
    contract.getPastEvents('WorkflowStatusChange', { filter: { _from: accounts[0] }, fromBlock: 0, toBlock: 'latest' }, function (error, events) { if (!error) console.log(events) });
  };

  getWorkflowStatus = async (erreur, tx) => {
    if (tx) {
      const { contract, web3 } = this.state;
      const context = this;
      await web3.eth.getTransactionReceipt(tx, async function (erreur, receipt) {
        if (receipt.status) {
          const contractWorkflowStatus = await contract.methods.getWorkflowStatus().call();
          console.log(`contractWorkflowStatus ${contractWorkflowStatus} `);
          context.setState({ contractWorkflowStatus });
        }
      });
    }
  }
  */
/*
  whitelist = async () => {
    const { accounts, contract, web3 } = this.state;
    const addressWhitelist = this.addressWhitelist.value;
    let context = this;
    await contract.methods.register(addressWhitelist).send({ from: accounts[0], gasPrice: 100000 }, async function (erreur, tx) {
      if (tx) {
        console.log("[register] tx : ", tx);
        await web3.eth.getTransactionReceipt(tx, async function (erreur, receipt) {
          console.log("[register] receipt.logs :", receipt.logs);
          if (receipt.status) {
            let response = await contract.methods.getWhitelist().call();
            context.setState({ whitelistArray: response });
            context.addressWhitelist.value = "";

            let events = contract.events.allEvents();
            console.log(events);
          }
        })
      }
    });
  };
  */

  proposal = async () => {
    const { accounts, contract, web3 } = this.state;
    const proposalDescription = this.proposalDescription.value;
    let context = this;
    await contract.methods.registerProjet(proposalDescription).send({ from: accounts[0], gasPrice: 100000 }, async function (erreur, tx) {
      if (tx) {
        console.log("[registerProjet] tx : ", tx);
        await web3.eth.getTransactionReceipt(tx, async function (erreur, receipt) {
          console.log("[registerProjet] receipt.logs :", receipt.logs);
          if (receipt.status) {
            let response = await contract.methods.getProject().call();
            context.setState({ proposalArray: response });
            context.proposalDescription.value = "";
          }
        })
      }
    });
  };

  deposite = async () => {
    const { accounts, contract, web3 } = this.state;
    let context = this;
    const daiAmount = this.daiAmount.value;
    const idProjet = this.idProjet.value;
    const time = this.time.value;
    console.log('daiAmount : ',daiAmount);
    console.log('idProjet : ',idProjet);
    console.log('time : ',time);



    await contract.methods.approve(daiAmount,idProjet,time).send({ from: accounts[0], gasPrice: 100000 }, async function (erreur, tx) {
      if (tx) {
        console.log("[approve] tx : ", tx);
        await web3.eth.getTransactionReceipt(tx, async function (erreur, receipt) {
          console.log("[approve] receipt.logs :", receipt.logs);
          if (receipt.status) {
            //let response = await contract.methods.getProject().call();
            // context.setState({ proposalArray: response });
            //context.proposalDescription.value = "";
          }else if (erreur){
            console.log('erreur : ', erreur);
          }
        })
      }
    });
  };

  /*
  vote = async () => {
    const { accounts, contract, web3 } = this.state;
    const voteId = this.voteId.value;
    let context = this;
    // Interaction avec le smart contract pour ajouter un compte 
    await contract.methods.vote(voteId).send({ from: accounts[0], gasPrice: 100000 }, async function (erreur, tx) {
      if (tx) {
        console.log("[vote] tx : ", tx);
        await web3.eth.getTransactionReceipt(tx, async function (erreur, receipt) {
          console.log("[vote] receipt.logs :", receipt.logs);
          if (receipt.status) {
            let response = await contract.methods.getProject().call();
            context.setState({ proposalArray: response });
            context.voteId.value = 0;
          }
        })
      }
    });
  };
*/
/*
  renderWorkflowButtons() {
    let buttonLabel = "Status du contrat inconnu !";
    let status = parseInt(this.state.contractWorkflowStatus);
    switch (status) {
      case 0:
        buttonLabel = "started";
        break;
      case 1:
        buttonLabel = "ended";
        break;
      case 2:
        buttonLabel = "thanks";
        break;
   
    }
    if (status < 5) {
      return (
        <Grid item sm={12}>
          <br></br>
          <Button onClick={this.nextWorkflow} color="secondary" variant="contained" display="flex" justifyContent="flex-end"> {buttonLabel} </Button>
        </Grid>
      );
    } else {
      return (
        <Grid item sm={12}>
          <br></br>
          <h5>Vote terminé</h5>
        </Grid>
      );
    }
  }

  renderWorklfowStatus() {
    let label = "Status du contrat inconnu !";
    switch (parseInt(this.state.contractWorkflowStatus)) {
      case 0:
        label = "notstartedyet";
        break;
      case 1:
        label = "started";
        break;
      case 2:
        label = "ended";
        break;
    }
    return (
      <h5 color="primary">Workflow Status = { label} ({ this.state.contractWorkflowStatus}) </h5>
    );
  }

  */
/*
  renderVoterRegistration() {
    if (parseInt(this.state.contractWorkflowStatus) === 0) {
      if (this.state.isOwner) {
        return (
          <Grid item sm={12}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Card style={{ width: '50rem' }}>
                <Card.Header><strong>Liste des électeurs enregistrés</strong></Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>@</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.whitelistArray !== null &&
                            this.state.whitelistArray.map((a) => <tr key={a}><td>{a}</td></tr>)
                          }
                        </tbody>
                      </Table>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </div>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Card style={{ width: '50rem' }}>
                <Card.Header><strong>Enregistrer un nouvel électeur</strong></Card.Header>
                <Card.Body>
                  <Form.Group>
                    <Form.Control type="text" id="address"
                      ref={(input) => { this.addressWhitelist = input }}
                    />
                  </Form.Group>
                  <Button onClick={this.whitelist} variant="contained" color="primary" > Enregistrer </Button>
                </Card.Body>
              </Card>
            </div>
          </Grid>
        );
      } else {
        return (
          <Grid item sm={12}>
            <h3>Veuillez attendre la fin de l'enregistrement des électeurs ...</h3>
          </Grid>
        );
      }
    } else {
      return (
        <Grid item sm={12}>
        </Grid>
      );
    }
  }
  */
  renderProposalsRegistration() {
    let status = parseInt(this.state.contractWorkflowStatus);
    return (
      <Grid item sm={12}>
        {status > 0 &&
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '50rem' }}>
              <Card.Header><strong>Liste des propositions</strong></Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Table striped bordered hover>
                      <tbody>
                        {this.state.proposalArray !== null &&
                          this.state.proposalArray.map((p) => <tr key={p.description}><td>{p.description}</td></tr>)
                        }
                      </tbody>
                    </Table>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
        }
        <br></br>
        {status === 1 &&
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '50rem' }}>
              <Card.Header><strong>Enregistrer une nouvelle proposition</strong></Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Control type="text" id="proposalDescription"
                    ref={(input) => { this.proposalDescription = input }}
                  />
                </Form.Group>
                <Button onClick={this.proposal} variant="contained" color="primary" > Enregistrer </Button>
              </Card.Body>
            </Card>
          </div>
        }
      </Grid>
    );
  }

  renderDeposite() {
    let status = parseInt(this.state.contractWorkflowStatus);
    return (
      <Grid item sm={12}>
       
       
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Form.Group>
          <Form.Label>Dai amount</Form.Label>

            <Form.Control type="number" id="daiAmount"
              ref={(input) => { this.daiAmount = input }}
            />
            </Form.Group>

          

          <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Projets : </Form.Label>
              <Form.Control as="select"
                 ref={(input) => { this.idProjet = input }}>
                <option>projet 1</option>
                <option>projet 2</option>
                <option>projet 3</option>
                <option>projet 4</option>
                <option>projet 5</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label>Durée : </Form.Label>
              <Form.Control as="select"
                 ref={(input) => { this.time = input }}>
                <option>3 mois</option>
                <option>6 mois</option>
                <option>1 an</option>
                <option>2 an</option>
                <option>Don</option>
              </Form.Control>

           
             </Form.Group>

                <Button onClick={this.deposite} variant="contained" color="primary" > Deposite </Button>
          </div>
      </Grid>
    );
  }

  /*
  renderVotingSession() {
    let status = parseInt(this.state.contractWorkflowStatus);
    return (
      <Grid item sm={12}>
        {status === 3 &&
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '50rem' }}>
              <Card.Header><strong>Voter pour la proposition</strong></Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Control type="number" id="voteId" min={0} max={this.state.proposalArray.length - 1}
                    ref={(input) => { this.voteId = input }}
                  />
                </Form.Group>
                <Button onClick={this.vote} variant="contained" color="primary" > Voter </Button>
              </Card.Body>
            </Card>
          </div>
        }
      </Grid>
    );
  }

  renderVotesTallied() {
    let status = parseInt(this.state.contractWorkflowStatus);
    if (status === 5) {
      return (
        <h5 color="primary">Proposition gagnante: { this.state.winningProposalId} </h5>
      );
    } if (status === 4) {
      return (
        <h5 color="primary">Suspens ... </h5>
      );
    } else {
      return (
        <h5 color="primary">... </h5>
      );
    }
  }
*/
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <AppBar position="static" color="primary" elevation={2} >
          <Toolbar >
            <Typography variant="h6" color="inherit" noWrap >
              ChainForest
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" component="main">
          <Grid container spacing={2} alignItems="center">
            <Grid item sm={12}>
              {this.state.isOwner ?
                <h2>Vous êtes l'Administrateur</h2>
                : <h2>Vous n'êtes pas l'Administrateur</h2>
              }
              <div color="textPrimary" href="#" >
                {this.state.accounts}
              </div>
              <br />
             
              <div>
              {this.renderDeposite()}
              </div>
            </Grid>
            {this.renderProposalsRegistration()}            
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;