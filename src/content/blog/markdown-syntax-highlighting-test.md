---
title: 'Markdown Syntax Highlighting'
description: 'This is a test of the syntax highlighting system'
pubDate: 'Mar 28 2024'
heroImage: ''
---

Here are some code snippets to verify that my code is being highlighted properly.

## TypeScript

```typescript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
console.log(greeter.greet());
```

# Go

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

## Python

```python
class Greeter:
    def __init__(self, message):
        self.message = message
    
    def greet(self):
        return f"Hello, {self.message}"

greeter = Greeter("world")
print(greeter.greet())
```

## Rust

```rust
struct Greeter {
    message: String,
}

impl Greeter {
    fn new(message: &str) -> Greeter {
        Greeter { message: String::from(message) }
    }

    fn greet(&self) -> String {
        format!("Hello, {}", self.message)
    }
}

fn main() {
    let greeter = Greeter::new("world");
    println!("{}", greeter.greet());
}
```

## JavaScript

```js
class Greeter {
    constructor(message) {
        this.message = message;
    }

    greet() {
        return `Hello, ${this.message}`;
    }
}

let greeter = new Greeter("world");
console.log(greeter.greet());
```
