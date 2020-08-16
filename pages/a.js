export default function A() {
  return (
    <>
               <form method="POST" action="/am" enctype="multipart/form-data">
                <input type="text" name="textfield"/><br />
                <input type="file" name="filefield"/><br />
                <input type="submit" />
              </form>
    </>
  )
}
