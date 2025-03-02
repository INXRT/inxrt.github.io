// Mobile Menu Toggle
document.getElementById("mobile-menu").addEventListener("click", function() {
  document.querySelector(".nav-links").classList.toggle("active");
});
// Cover Art Preview
document.getElementById("cover-art").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = document.getElementById("cover-preview");
      preview.style.backgroundImage = `url(${e.target.result})`;
      preview.style.backgroundSize = "cover";
      preview.style.backgroundPosition = "center";
    };
    reader.readAsDataURL(file);
  }
});

// -----------------------
// Google Drive Picker Integration
// -----------------------
var developerKey = "YOUR_GOOGLE_API_KEY";
var clientId = "YOUR_GOOGLE_CLIENT_ID";
var scope = ['https://www.googleapis.com/auth/drive.readonly'];
var oauthToken;

function onApiLoad() {
  gapi.load('auth', { callback: onAuthApiLoad });
  gapi.load('picker', { callback: onPickerApiLoad });
}

function onAuthApiLoad() {
  gapi.auth.authorize(
    { client_id: clientId, scope: scope, immediate: false },
    handleAuthResult
  );
}

function onPickerApiLoad() {
  // Picker API loaded.
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    oauthToken = authResult.access_token;
    createPicker();
  }
}

function createPicker() {
  if (oauthToken) {
    var picker = new google.picker.PickerBuilder()
      .addView(google.picker.ViewId.DOCS)
      .setOAuthToken(oauthToken)
      .setDeveloperKey(developerKey)
      .setCallback(googlePickerCallback)
      .build();
    picker.setVisible(true);
  }
}

function googlePickerCallback(data) {
  if (data.action === google.picker.Action.PICKED) {
    var fileId = data.docs[0].id;
    console.log("Google Drive File ID:", fileId);
    // Further processing can be done here.
  }
}

function launchGoogleDrivePicker() {
  onApiLoad();
}

// -----------------------
// OneDrive Picker Integration
// -----------------------
function launchOneDrivePicker() {
  var odOptions = {
    clientId: "YOUR_ONEDRIVE_APP_ID",
    action: "share", // or "download" as needed
    multiSelect: false,
    advanced: {},
    success: function(files) {
      console.log("OneDrive Files:", files);
    },
    cancel: function() {
      console.log("OneDrive Picker canceled.");
    },
    error: function(e) {
      console.error("OneDrive Picker Error:", e);
    }
  };
  OneDrive.open(odOptions);
}

// -----------------------
// Dropbox Chooser Integration
// -----------------------
function launchDropboxChooser() {
  Dropbox.choose({
    success: function(files) {
      console.log("Dropbox Files:", files);
    },
    cancel: function() {
      console.log("Dropbox chooser canceled.");
    },
    linkType: "preview",
    multiselect: false,
    extensions: ['.mp3', '.wav', '.jpg', '.png']
  });
}

// -----------------------
// Dispatch Function for Cloud Services
// -----------------------
function uploadFrom(source) {
  if (source === 'google-drive') {
    launchGoogleDrivePicker();
  } else if (source === 'onedrive') {
    launchOneDrivePicker();
  } else if (source === 'dropbox') {
    launchDropboxChooser();
  } else {
    alert("Unknown upload source: " + source);
  }
}
