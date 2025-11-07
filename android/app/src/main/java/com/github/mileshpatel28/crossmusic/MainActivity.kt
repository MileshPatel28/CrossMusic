package com.github.mileshpatel28.crossmusic

import android.media.AudioAttributes
import android.media.MediaPlayer
import android.os.Bundle
import android.util.Log
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.github.mileshpatel28.crossmusic.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    var isPlaying = false;


    private lateinit var binding : ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        binding = ActivityMainBinding.inflate(layoutInflater);

        val url = "http://${getString(R.string.server_adresse)}:3001/songs/Blank.mp3"

        Log.v("DEBUG", url);

        val mediaPlayer = MediaPlayer().apply {
            setAudioAttributes(
                AudioAttributes.Builder()
                    .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                    .setUsage(AudioAttributes.USAGE_MEDIA)
                    .build()
            )
            setDataSource(url)
            prepare()
        }


        binding.btnPlayPause.setOnClickListener {

            if(isPlaying){
                isPlaying = false;
                mediaPlayer.pause()
                binding.btnPlayPause.setImageResource(R.drawable.play)
            }
            else {
                isPlaying = true;
                mediaPlayer.start()
                binding.btnPlayPause.setImageResource(R.drawable.pause);
            }
        }









    }
}