$(window).on('load', function () {
  AOS.refresh();
});

$(document).ready(function () {
  // Initialize AOS
  AOS.init();

  // Variable Declarations
  var isExpandedAbt;
  var isExpandedContact;
  var width;
  var height;
  var isCollapse;
  // var projectsWidth;
  // var breakPoint;

  $(window).resize(function () {
    width = wrapper.width();
    // projectsWidth = $("#projects").width(); 
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 750) {
      $(".navbar").addClass("bg-dark");
    } else {
      $(".navbar").removeClass("bg-dark");
    }

    if ($(this).scrollTop() >= $('#home').position().top) {
      var navBtn = document.getElementsByClassName("navbtn");

      for (var i = 0; i < navBtn.length; i++) {
        if (navBtn[i].dataset.nav === "home") {
          $("#navHome").addClass("active");
          $("#navAbout").removeClass("active");
          $("#navProjects").removeClass("active");
          $("#navWork").removeClass("active");
          $("#navContact").removeClass("active");
        }
      }
    }
    if ($(this).scrollTop() >= $('#about').position().top) {
      var navBtn = document.getElementsByClassName("navbtn");

      for (var i = 0; i < navBtn.length; i++) {
        if (navBtn[i].dataset.nav === "about") {
          $("#navAbout").addClass("active");
          $("#navHome").removeClass("active");
          $("#navProjects").removeClass("active");
          $("#navWork").removeClass("active");
          $("#navContact").removeClass("active");
        }
      }
    }
    if ($(this).scrollTop() >= $('#projects').position().top) {
      var navBtn = document.getElementsByClassName("navbtn");

      for (var i = 0; i < navBtn.length; i++) {
        if (navBtn[i].dataset.nav === "projects") {
          $("#navProjects").addClass("active");
          $("#navHome").removeClass("active");
          $("#navAbout").removeClass("active");
          $("#navWork").removeClass("active");
          $("#navContact").removeClass("active");
        }
      }
    }
    if ($(this).scrollTop() >= $('#workExperience').position().top) {
      var navBtn = document.getElementsByClassName("navbtn");

      for (var i = 0; i < navBtn.length; i++) {
        if (navBtn[i].dataset.nav === "work") {
          $("#navWork").addClass("active");
          $("#navHome").removeClass("active");
          $("#navAbout").removeClass("active");
          $("#navProjects").removeClass("active");
          $("#navContact").removeClass("active");
        }
      }
    }
    if ($(this).scrollTop() >= $('#contact').position().top) {
      var navBtn = document.getElementsByClassName("navbtn");

      for (var i = 0; i < navBtn.length; i++) {
        if (navBtn[i].dataset.nav === "contact") {
          $("#navContact").addClass("active");
          $("#navHome").removeClass("active");
          $("#navAbout").removeClass("active");
          $("#navProjects").removeClass("active");
          $("#navWork").removeClass("active");
        }
      }
    }
  });

  // On click of skills button
  $("#learnOne").on("click", function (event) {
    isExpandedAbt = $("#learnOne").attr("aria-expanded");
    isExpandedAbt = "false";
    isExpandedContact = "true";
    updateClass();
  })
  // On click of contact me button
  $("#learnTwo").on("click", function (event) {
    isExpandedContact = $("#learnTwo").attr("aria-expanded");
    isExpandedContact = "false";
    isExpandedAbt = "true";
    updateClass();
  })
  // Function that updates classes for collapsed elements
  function updateClass() {

    $("#learnOne").children().empty();
    $("#learnTwo").children().empty();
    $("#learnOne").append('<h5 class="heading text-light"><i class="fas fa-cogs icon text-light"></i>Skills <i class="fas fa-angle-down"></i></h5>');
    $("#learnTwo").append('<h5 class="heading text-light"><i class="fas fa-school icon text-light"></i> Education <i class="fas fa-angle-down"></i></h5>');

    // if ((isExpandedContact === "false") && (isExpandedAbt === "false")) {
    //   $(".col1").addClass("col animated rotateIn");
    //   $(".col2").addClass("col animated rotateIn");
    //   console.log("Skilla and education");
    //   $("#learnOne").children().empty();
    //   $("#learnOne").append('<h5 class="heading text-light"><i class="fas fa-cogs icon text-light"></i>Skills <i class="fas fa-angle-up"></i></h5>');
    //   $("#learnTwo").children().empty();
    //   $("#learnTwo").append('<h5 class="heading text-light"><i class="fas fa-school icon text-light"></i> Education <i class="fas fa-angle-up"></i></h5>');
    // }
    if ((isExpandedAbt === "false") && ((isExpandedContact === undefined) || isExpandedContact === "true")) {
      $(".col1").show();
      $(".col2").hide();
      // $(".col1").removeClass("col animated rotateIn");
      $(".col1").addClass("col animated rotateIn");
      $("#education").removeClass("show");
      $(".col2").removeClass("col animated rotateIn");
      isCollapse = $("#learnOne").attr("aria-expanded");
      console.log("Skills if loop");
      console.log(isCollapse);
      if (isCollapse === "false") {
        $("#learnOne").children().empty();
        $("#learnOne").append('<h5 class="heading text-light"><i class="fas fa-cogs icon text-light"></i>Skills <i class="fas fa-angle-up"></i></h5>');
        console.log("Inside skills isCollapse if loop");
      } else {
        $("#learnOne").children().empty();
        $("#learnOne").append('<h5 class="heading text-light"><i class="fas fa-cogs icon text-light"></i>Skills <i class="fas fa-angle-down"></i></h5>');
        console.log("Inside skills isCollapse else loop");
      }
    }
    else if ((isExpandedContact === "false") && ((isExpandedAbt === undefined) || isExpandedAbt === "true")) {
      $(".col1").hide();
      $(".col2").show();
      // $(".col2").removeClass("col animated rotateIn");
      $(".col2").addClass("col animated rotateIn");
      $(".col1").removeClass("col animated rotateIn");
      $("#skillset").removeClass("show");
      // isExpandedAbt = "false";
      console.log("Education if loop");
      console.log(isCollapse);
      isCollapse = $("#learnTwo").attr("aria-expanded");
      if (isCollapse === "false") {
        $("#learnTwo").children().empty();
        $("#learnTwo").append('<h5 class="heading text-light"><i class="fas fa-school icon text-light"></i> Education <i class="fas fa-angle-up"></i></h5>');
        console.log("Inside education isCollapse if loop");
      } else {
        $("#learnTwo").children().empty();
        $("#learnTwo").append('<h5 class="heading text-light"><i class="fas fa-school icon text-light"></i> Education <i class="fas fa-angle-down"></i></h5>');
        console.log("Inside education isCollapse else loop");
      }
    }
  }

  // Hook projects dom
  for (var i = 0; i < projects.length; i++) {
    height = Math.floor(width / projects[i].ratio);
    // if (projectsWidth < 576) {
    //   console.log("Inside if loop");
    //   breakPoint = 2;
    // } else {
    //   console.log("Inside else loop");
    //   breakPoint = 3;
    // }
    // console.log(breakPoint);
    // console.log(width)
    if (i % 3 === 0) {
      var rowDiv = $("<div>");
      addClassValue(rowDiv, "row");
      var col1Div = $("<div>");
      addClassValue(col1Div, "col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4");
      // var col2Div = $("<div>");
      // if (i === 3)
      // addClassValue(col2Div, "col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3");
      // else
      //   addClassValue(col2Div, "col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5");
      addAttribute(col1Div, "data-aos", "flip-up");
      addAttribute(col1Div, "data-aos-duration", "1000");
      var wrapper = $("<div>");
      addClassValue(wrapper, "wrapper");
      var img1Tag = $("<img>");
      addAttribute(img1Tag, "src", projects[i].image);
      addAttribute(img1Tag, "width", width);
      addAttribute(img1Tag, "height", height);
      addClassValue(img1Tag, "image");
      var overlayDiv = $("<div>");
      addClassValue(overlayDiv, "overlay");
      addClassValue(overlayDiv, "learnMore");
      addAttribute(overlayDiv, "data-toggle", "modal");
      addAttribute(overlayDiv, "data-target", "#modal");
      addAttribute(overlayDiv, "data-id", projects[i].id);
      var textDiv = $("<div>");
      addClassValue(textDiv, "textOverlay");
      textDiv.text(projects[i].name);
      appendElement(textDiv, "<hr style='border-top: 3px solid white'/>");
      textDiv.append(`<button type='button' class='btn btn-outline-light learnMore' data-toggle='modal'
       data-target='#modal' data-id=${projects[i].id}> Learn More! </button>`);
      appendElement(overlayDiv, textDiv);
      appendElement(wrapper, img1Tag);
      appendElement(wrapper, overlayDiv);
      appendElement(col1Div, wrapper);
      appendElement(rowDiv, col1Div);
      // appendElement(rowDiv, col2Div);
    } else {
      var col3Div = $("<div>");
      // if (i === 3)
      col3Div.addClass("col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4");
      // else
      //   col3Div.addClass("col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5");
      addAttribute(col3Div, "data-aos", "flip-up");
      addAttribute(col3Div, "data-aos-duration", "1000");
      // if (i % 3 === 1) {
      //   var col4Div = $("<div>");
      //   col4Div.addClass("col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1");
      // }
      var wrapper = $("<div>");
      addClassValue(wrapper, "wrapper");
      var img2Tag = $("<img>");
      addAttribute(img2Tag, "src", projects[i].image);
      addAttribute(img2Tag, "width", width);
      addAttribute(img2Tag, "height", height);
      addClassValue(img2Tag, "image");
      var overlayDiv = $("<div>");
      addClassValue(overlayDiv, "overlay");
      addClassValue(overlayDiv, "learnMore");
      addAttribute(overlayDiv, "data-toggle", "modal");
      addAttribute(overlayDiv, "data-target", "#modal");
      addAttribute(overlayDiv, "data-id", projects[i].id);
      var textDiv = $("<div>");
      addClassValue(textDiv, "textOverlay");
      textDiv.text(projects[i].name);
      appendElement(textDiv, "<hr style='border-top: 3px solid white'/>");
      textDiv.append(`<button type='button' class='btn btn-outline-light learnMore' data-toggle='modal' 
      data-target='#modal' data-id=${projects[i].id}> Learn More! </button>`);
      appendElement(overlayDiv, textDiv);
      appendElement(wrapper, img2Tag);
      appendElement(wrapper, overlayDiv);
      appendElement(col3Div, wrapper);
      appendElement(rowDiv, col3Div);
      // if (breakPoint === 3)
      //   appendElement(rowDiv, col4Div);
    }
    $("#projectSection").append(rowDiv);
  }

  // Hook work experience to dom
  for (var i = 0; i < workExperience.length; i++) {
    var rowDiv = $("<div>");
    addClassValue(rowDiv, "row");
    addAttribute(rowDiv, "data-aos", "fade-up");
    addAttribute(rowDiv, "data-aos-duration", "1000");
    var col1Div = $("<div>");
    addClassValue(col1Div, "col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2");
    var col2Div = $("<div>");
    addClassValue(col2Div, "col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1");
    var col3Div = $("<div>");
    addClassValue(col3Div, "col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7");
    var col4Div = $("<div>");
    addClassValue(col4Div, "col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2");
    var verticalDiv = $("<div>");
    addClassValue(verticalDiv, "bulletVl");
    var ulTag = $("<ul>");
    for (var j = 0; j < workExperience[i].responsibilities.length; j++) {
      ulTag.append("<li>" + workExperience[i].responsibilities[j] + "</li>");
    }
    appendElement(col2Div, "<i class='fas fa-dot-circle'></i>");
    appendElement(col2Div, verticalDiv);
    appendElement(col3Div, "<h1>" + workExperience[i].startDate.toUpperCase() + " - " + workExperience[i].endDate.toUpperCase() + "</h1>");
    appendElement(col3Div, "<h2>" + workExperience[i].companyName + "</h2>");
    appendElement(col3Div, "<h3>" + workExperience[i].role + "</h3>");
    appendElement(col3Div, ulTag);
    appendElement(rowDiv, col1Div);
    appendElement(rowDiv, col2Div);
    appendElement(rowDiv, col3Div);
    appendElement(rowDiv, col4Div);
    $("#workExperience").append(rowDiv);
    $("#workExperience").append("<br>");
  }

  // Function to append an element
  function appendElement(parent, child) {
    parent.append(child);
  }

  // Function to add attribute
  function addAttribute(element, key, value) {
    element.attr(key, value);
  }

  // Function to add class
  function addClassValue(element, value) {
    element.addClass(value);
  }

  // active class
  $(".navbtn").on("click", function () {
    var target = $(this).data("nav");

    if (target === "home") {
      $(this).addClass("active");
      $(this).parent().siblings().children().removeClass("active");
    } else if (target === "work") {
      $(this).addClass("active");
      $(this).parent().siblings().children().removeClass("active");
    } else if (target === "about") {
      $(this).addClass("active");
      $(this).parent().siblings().children().removeClass("active");
    } else if (target === "projects") {
      $(this).addClass("active");
      $(this).parent().siblings().children().removeClass("active");
    } else if (target === "contact") {
      $(this).addClass("active");
      $(this).parent().siblings().children().removeClass("active");
    }
  });

  // Generate modal
  $(".learnMore").on("click", function (event) {
    event.preventDefault();
    var id = $(this).data("id");
    var name;
    var desc;
    var link;
    var repoLink;
    for (var i = 0; i < projects.length; i++) {
      if (id === projects[i].id) {
        name = projects[i].name;
        desc = projects[i].desc;
        link = projects[i].link;
        repoLink = projects[i].repoLink;
      }
    }
    $("#modalHeader").text(name);
    $("#modalBody").text(desc);
    $("#link").empty();
    $("#link").append("<a href=" + link + " " + "target=_blank>Deployed Link<a/>&nbsp&nbsp&nbsp");
    $("#link").append("<a href=" + repoLink + " " + "target=_blank>Repository<a/>");
    $(".modal-dialog").attr("width", width);
    $(".modal-dialog").attr("height", height);
    $("#modal").show();
  });
})