require 'sinatra'
require 'json'

get '/' do
  erb :index
end

#note the relative path here (/favorites)
#results in a routine being executed,
#it functions similar to a "controller" in ruby-on-rails
get '/favorites' do
  #response.header['Content-Type'] = 'application/json'
  #user sinatra_helper :  send_file
  #by default, will set content_type per file passed by send_file
  #thus, content_type 'application/json'
  send_file 'data.json'
end

=begin

def movie_not_favorited?(file, oid)
  fav = true
  file.each{|movie|
    if oid == movie["oid"]
      fav = false
    end
  }
  return fav
end
def add_movie(file, movie)
  file << movie
  File.write('data.json',JSON.pretty_generate(file))
end

=end


post '/favorites' do
  #for debug, the following will output to the terminal window
  #puts "AHHHHHHHH"
  file = JSON.parse(File.read('data.json'))
  # following for debug , prints to command window 
  #puts file
  unless params[:name] && params[:oid]
    return 'Invalid Request'
  end
  not_fav = true
  movie = { "name" => params[:name], "oid" => params[:oid] }
  #the above syntax used so as to match JSON parse output format of strings for keys
  #alternatively could use the following symbol format:
  #
  #movie = { name: params[:name], oid: params[:oid] }
  #
  #however, then would need the following syntax for the condition statement in the loop below
  # 
  #    if movie[:oid] == file_movie["oid"]
  #
  file.each{|file_movie|
    #note: JSON.parse returns strings as keys to hashes
    #whereas the movie hash was formed using symbols as keys
    #so have to reference the hash values as follows:

    if movie["oid"] == file_movie["oid"]
      not_fav = false
      puts not_fav
      return 'Movie already favorited'
    end
  }

  if not_fav == true
    file << movie
    File.write('data.json',JSON.pretty_generate(file))
    return 'Movie added to favorites'
  end

  #the following doesnt seem to return anything
  #return not_fav
  
#Finish this to send back info if was newly favorited movie
#following from "get started with sinatra " bookmark
  #content_type 'application/json'
  #value = not_fav ?  : 'not done'
  #{ :id => params[:id], :status => value }.to_json
  #{ :status => not_fav }.to_json
end



