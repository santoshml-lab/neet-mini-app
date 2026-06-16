
const supabase = window.supabase.createClient(
  "https://ivwolfnwzrcvcwkobyzl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2d29sZm53enJjdmN3a29ieXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MjgyNzgsImV4cCI6MjA5NzEwNDI3OH0.VrXoMx0gNFa0j7Lwsc6S-J5bTYgG0P40PLHDZ-tNAO0"
);

// HTML buttons se use karne ke liye
window.supabaseClient = supabase;

async function addData(){

  const text = document.getElementById("text").value;

  if(!text){
    alert("Enter text");
    return;
  }

  const { data, error } = await supabase
    .from("notes")
    .insert([{ text }])
    .select();

  console.log("INSERT RESULT:", { data, error });

  if(error){
    console.log(error);
    alert(error.message);
    return;
  }

  alert("Saved!");
  loadData();
}

async function loadData(){

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if(error){
    console.log(error);
    alert(error.message);
    return;
  }

  document.getElementById("list").innerHTML =
    data.map(d => `<p>${d.text}</p>`).join("");
}

loadData();
