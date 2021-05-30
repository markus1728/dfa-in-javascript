# DFA-in-Javascript
A straightforward implementation of a "Deterministic Finite Automata" (DFA) in Javascript. 

Characteristics of a DFA:
  - each of its transitions is uniquely determined by its source state and input symbol
  - reading an input symbol is required for each state transition.

# Usage

Create a DFA instance, add the states and the transitions. 

```javascript
let ExampleDFA = new DFA()
ExampleDFA.createState("S0", true, false);
ExampleDFA.createState("S1", false, true);
ExampleDFA.createState("S2", false, false);
ExampleDFA.createState("S3", false, false);
ExampleDFA.createTransition("S0", "a", "S2");
ExampleDFA.createTransition("S0", "b", "S3");
ExampleDFA.createTransition("S1", "a", "S0");
ExampleDFA.createTransition("S1", "b", "S1");
ExampleDFA.createTransition("S2", "a", "S0");
ExampleDFA.createTransition("S2", "b", "S1");
ExampleDFA.createTransition("S3", "a", "S2");
ExampleDFA.createTransition("S3", "b", "S3");
console.log(JSON.stringify(ExampleDFA, null, 4));
```

Create the transition-table:
```javascript
ExampleDFA.createTransitionTable();
```

Input a sequence to check its acceptance by the automata.

```javascript
ExampleDFA.verify(["a", "b", "b", "b", "b"]);
```
