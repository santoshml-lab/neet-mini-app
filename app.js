const supabase = window.supabase.createClient(
  "YOUR_SUPABASE_URL",
  "YOUR_ANON_KEY"
);

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

  console.log(data, error);

  if(error){
    alert(error.message);
    return;
  }

  alert("Saved!");
  loadData();
}

async function loadData(){

  const { data } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  document.getElementById("list").innerHTML =
    data.map(d => `<p>${d.text}</p>`).join("");

}

loadData();
