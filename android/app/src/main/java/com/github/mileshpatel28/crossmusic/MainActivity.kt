package com.github.mileshpatel28.crossmusic

import android.media.AudioAttributes
import android.media.MediaPlayer
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.widget.SeekBar
import androidx.appcompat.app.AppCompatActivity
import com.github.mileshpatel28.crossmusic.databinding.ActivityMainBinding
import kotlin.math.floor


class MainActivity : AppCompatActivity() {

    var isPlaying = false;


    private lateinit var binding : ActivityMainBinding

    val mediaPlayer = MediaPlayer()
    val handler: Handler = Handler(Looper.getMainLooper())
    private val updateSeekBar : Runnable =  Runnable {

        run {
            if(mediaPlayer.isPlaying()){
                binding.tvSongTime.setText(formatDuration(mediaPlayer.currentPosition.toDouble()/1000))
                binding.tvSongTimeInverse.setText("-${formatDuration((mediaPlayer.duration - mediaPlayer.currentPosition).toDouble()/1000)}")
            }

            handler.postDelayed(updateSeekBar,500)
        }

    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater);
        setContentView(binding.root)


        val url = "http://${getString(R.string.server_adresse)}:3002/songs/Blank.mp3"


        mediaPlayer.apply {
            setAudioAttributes(
                AudioAttributes.Builder()
                    .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                    .setUsage(AudioAttributes.USAGE_MEDIA)
                    .build()
            )
            setDataSource(url)
            prepareAsync()
        }






        mediaPlayer.setOnPreparedListener {
            Log.v("DEBUG", " listener ready")
            binding.tvSongTime.setText(formatDuration(mediaPlayer.currentPosition.toDouble()/1000))
            binding.tvSongTimeInverse.setText("-${formatDuration((mediaPlayer.duration - mediaPlayer.currentPosition).toDouble()/1000)}")
            binding.seekBar.max = mediaPlayer.duration
            handler.post(updateSeekBar)
        }

        binding.seekBar.setOnClickListener {
            Log.v("DEBUG", binding.seekBar.progress.toString())
        }
        binding.seekBar.setOnSeekBarChangeListener(SeekBarListener())



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

            binding.tvSongTime.text = formatDuration(mediaPlayer.currentPosition.toDouble()/1000)

        }









    }


    fun formatDuration(value : Double) : String{
        val hrs = floor(value / 3600)
        val mins = floor((value % 3600) / 60)
        val secs = floor(value % 60)


        if(hrs > 0){
            return "${hrs.toInt()}:${mins.toInt().toString().padStart(2,'0')}:${secs.toInt().toString().padStart(2, '0')}"
        }
        else{
            return "${mins.toInt()}:${secs.toInt().toString().padStart(2, '0')}";
        }
    }


    override fun onDestroy() {
        super.onDestroy()
        handler.removeCallbacks(updateSeekBar)
    }


    inner class SeekBarListener : SeekBar.OnSeekBarChangeListener{
        override fun onProgressChanged(
            seekBar: SeekBar?,
            progress: Int,
            fromUser: Boolean
        ) {
            mediaPlayer.seekTo(progress)
            binding.tvSongTime.setText(formatDuration(mediaPlayer.currentPosition.toDouble()/1000))
            binding.tvSongTimeInverse.setText("-${formatDuration((mediaPlayer.duration - mediaPlayer.currentPosition).toDouble()/1000)}")
        }

        override fun onStartTrackingTouch(p0: SeekBar?) {}

        override fun onStopTrackingTouch(p0: SeekBar?) {}

    }


}