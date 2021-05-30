class DFA {
    constructor() {
        this.states = []
        this.currentState = null;
        this.initialState = null;
        this.finalStates = []
        this.transitions = {}
    }

    createState(stateName, initial, final) {
        if (this.checkStateExistence(stateName)) {
            console.log("State " + stateName + " already exists");
            process.exit();
        }
        // create initial state
        else if (initial) {
            if (this.initialState === null) {
                let initialState = new State(stateName, initial, final);
                this.initialState = initialState
                this.currentState = initialState
                this.states.push(this.initialState);
                // make initial state a final state if final set true
                if (final) {
                    this.finalStates.push(this.initialState);
                }
            } else {
                console.log("Only one start state is allowed!");
                process.exit();
            }
        }
        // create final state
        else if (final) {
            let finalState = new State(stateName, initial, final);
            this.states.push(finalState);
            this.finalStates.push(finalState);
        }
        // create normal state
        else {
            let state = new State(stateName, initial, final);
            this.states.push(state);
        }
    }

    createTransition(startState, input, destinationState) {
        if (!this.checkStateExistence(startState)) {
            console.log("Start state " + startState + " does not exist");
            process.exit();
        } else if (!this.checkStateExistence(destinationState)) {
            console.log("Destination state " + destinationState + " does not exist")
            process.exit();
        } else if (this.checkTransitionExistence(startState, input)) {
            console.log("Transition for " + startState + " and " + input + " already defined. For DFA only unique transitions allowed")
            process.exit();
        } else {
            this.transitions = new Transition(startState, input, destinationState, this.transitions)
        }
    }

    createTransitionTable() {
        return console.table(this.transitions);
    }

    // only one transition for an input allowed -> deterministic
    // transitions S0 -> 1-> S2   and S0 -> 1 -> S3 not allowed in the same DFA
    checkTransitionExistence(startState, input) {
        if (this.transitions[startState] !== undefined) {
            return (input in this.transitions[startState]);
        } else {
            return false;
        }
    }

    checkStateExistence(state) {
        let stateExists = false;
        for (let i = 0; i < this.states.length; i++) {
            if (state === this.states[i].name) {
                stateExists = true;
                break;
            }
        }
        return stateExists;
    }

    getState(state) {
        return this.states.find(x => x.name === state)
    }

    verify(input) {
        for (let i = 0; i < input.length; i++) {
            // check if inputvalue is in the transitions of the current state
            // valid inputvalue is required for a DFA to change its state!
            if (input[i] in this.transitions[this.currentState.name]) {
                let destinationState = this.transitions[this.currentState.name][input[i]]; //get desitination state
                this.currentState = this.getState(destinationState);
            } else {
                console.log("Transition for " + input[i] + " does not exists.");
                process.exit();
            }
            //for last input check if state is final state
            if (i === input.length - 1) {
                if (this.currentState.final) {
                    console.log("The input " + input + " is accepted by this DFA.");
                } else {
                    console.log("The input " + input + " is NOT accepted by this DFA.")
                }
            }
        }
    }

    resetDFA() {
        this.currentState = this.initialState;
    }
}

class State {
    constructor(stateName, initial, final) {
        this.name = stateName;
        this.inital = initial;
        this.final = final;
    }
}

class Transition {
    constructor(startState, input, destinationState, transitionsDict) {
        let transInputDest = {}
        transInputDest[input] = destinationState;
        if (startState in transitionsDict) {
            transitionsDict[startState][input] = destinationState
        } else {
            transitionsDict[startState] = transInputDest;
        }
        return transitionsDict
    }
}



