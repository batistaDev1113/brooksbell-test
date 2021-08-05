(function () {
  /***
  DO NOT MODIFY JS DIRECTLY...
  SCROLL ALL THE WAY TO BOTTOM OF THIS SECTION AND ADD YOUR OWN CODE THAT WILL OVERWRITE THE DEFAULTS.
***/
  let secondaryStories = [
    {
      title: "Story 1",
      teaser: "Here is a little teaser for this story.",
      url: "https://www.brooksbell.com/about/",
      img: "https://www.brooksbell.com/wp-content/uploads/2019/01/pexels-photo-999267.jpeg",
    },
    {
      title: "Story 2",
      teaser: "Oh look, another teaser for a made up story!",
      url: "https://www.brooksbell.com/about/core-values/",
      img: "https://www.brooksbell.com/wp-content/uploads/2019/01/White-Paper-Header.jpg",
    },
    {
      title: "Story 3",
      teaser: "Wow, another teaser here!",
      url: "https://www.brooksbell.com/services/",
      img: "https://www.brooksbell.com/wp-content/uploads/2019/01/Managed-Testing-Services.png",
    },
    {
      title: "Story 4",
      teaser: "Yeah that's right, another teaser!",
      url: "https://www.brooksbell.com/about/team/",
      img: "https://www.brooksbell.com/wp-content/uploads/2019/01/approach-1.jpg",
    },
    {
      title: "Story 5",
      teaser: "Alright, last teaser, promise.",
      url: "https://www.brooksbell.com/about/news/",
      img: "https://www.brooksbell.com/wp-content/uploads/2019/01/sparkler-lit-and-burning_4460x4460.jpg",
    },
  ];

  $(document).ready(function () {
    let template = "";

    // set the first 3 secondary stories
    for (let i = 0; i < 3; i++) {
      template += `
        <div class="secondaryStoryWrapper" style="background: url(${secondaryStories[i].img}) no-repeat; background-size: cover;">
          <div class="storyInfoContainer">
            <h2>${secondaryStories[i].title}</h2>
            <p>${secondaryStories[i].teaser}</p>
            <a href="${secondaryStories[i].url}">Read More</a>
          </div> 
        </div>`;
    }

    $(template).appendTo("#secondaryContainer");
  });

  /***
    ONLY ADD YOUR CODE BELOW THIS POINT...DO NOT MODIFY CODE ABOVE.
  ***/

  // create and insert button inside the footer
  const insertButton = () => {
    let footer = document.querySelector("div#mainContainer footer");

    // create button
    let newButton = document.createElement("button");

    newButton.textContent = "Back to Top";
    newButton.classList.add("btn-footer");

    // scroll to top on click event
    newButton.onclick = function () {
      $("html,body").animate({ scrollTop: 0 }, "slow");
    };

    footer.appendChild(newButton);
  };

  // grab link and redirect to new http address
  const newRedirect = () => {
    const linkContainer = document.querySelector(".storyInfoContainer p > a");

    linkContainer.setAttribute("href", "https://www.brooksbell.com/click/");
  };

  // add column on the side of viewport
  const addColumn = () => {
    // main container
    const mainContainer = document.getElementById("mainContainer");

    //reference element
    const footerReference = document.getElementsByTagName("FOOTER")[0];
    // grab div container
    const sectionContainer = document.querySelector("#tertiaryContainer");

    const newElement = document.createElement("aside");
    newElement.classList.add("aside-section");
    const img = document.createElement("img");
    img.src = sectionContainer.children[0].getAttribute("src");
    newElement.appendChild(img);

    const cloneText = sectionContainer.children[1];
    const text = cloneText.cloneNode(true);

    newElement.appendChild(text);
    footerReference.before(newElement, footerReference);
  };

  // replace story function
  const replaceStory = () => {
    let indexDisplayed = [0, 1, 2]; // current index on the DOM
    let indexNotDisplayed = [3, 4]; // not yet selected

    // add click event to elements
    $(".secondaryStoryWrapper").click(function (event) {
      console.log("hey again");
      let tempDisplayed = indexDisplayed;
      let tempUnselected = indexNotDisplayed;
      let backGroundImg = $(this).css("background-image");
      backGroundImg = backGroundImg.substring(5, backGroundImg.length - 2);

      let index = secondaryStories.map((e) => e.img).indexOf(backGroundImg);

      let newRandomIndex =
        tempUnselected[Math.floor(Math.random() * Math.floor(2))];
      tempDisplayed.splice(tempDisplayed.indexOf(index), 1, newRandomIndex);

      let tempIndex = tempUnselected.indexOf(newRandomIndex);
      tempUnselected.splice(tempIndex, 1, index);

      indexDisplayed = tempDisplayed;
      indexNotDisplayed = tempUnselected;

      let newTemplate = ``;

      for (let i = 0; i < 3; i++) {
        let indexPicked = indexDisplayed[i];
        newTemplate += `
            <div class="secondaryStoryWrapper" style="background: url(${secondaryStories[indexPicked].img}) no-repeat; background-size: cover;">
              <div class="storyInfoContainer">
                <h2>${secondaryStories[indexPicked].title}</h2>
                <p>${secondaryStories[indexPicked].teaser}</p>
                <a href="${secondaryStories[indexPicked].url}">Read More</a>
              </div>
            </div>`;
      }
      $("#secondaryContainer").html(newTemplate);
    });
  };

  // grab parent element for sedon stories
  let secondaryCont = document.querySelector("#secondaryContainer");
  // use mutation observers to watch for DOM changes on second stories section
  let observer;

  observer = new MutationObserver(replaceStory);
  observer.observe(secondaryCont, {
    attributes: true,
    childList: true,
    subtree: true,
  });

  // function call
  replaceStory();

  insertButton();

  newRedirect();

  addColumn();
})();
