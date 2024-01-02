#![allow(non_snake_case)]
// import the prelude to get access to the `rsx!` macro and the `Scope` and `Element` types
use dioxus::prelude::*;


fn main() {
    // launch the web app
    dioxus_web::launch(App);

}

fn App(cx: Scope) -> Element {
    // State to manage the text input
    let text_input = use_state(&cx, || String::new());

    cx.render(rsx! {
        div {
            class: "flex flex-row",
            ul {
                class: "flex menu bg-base-200 w-56 p-0 [&_li>*]:rounded-none h-screen flex-col justify-around",
                li { a { "Item 3" } }
                li { a { "Item 2" } }
                li { a { "Item 1" } }
            }

            div {
                class: "flex basis-full place-items-center justify-center flex-col",
                textarea {
                    class: "h-1/2 w-1/2",
                    placeholder: "Type name here",
                    oninput: move |e| text_input.set(e.value.clone()),
                }
                button {
                    class: "btn btn-outline btn-accent w-1/2",
                    // onclick: move |_| is_modal_open.set(true),
                    "Send"
                }
            }
        }

    })
}